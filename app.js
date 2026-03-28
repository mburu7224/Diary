// Seet Up Diary - Main Application Logic (ChatGPT-style Layout)

// DOM Elements
const diaryInput = document.getElementById('diary-input');
const saveBtn = document.getElementById('save-btn');
const entriesList = document.getElementById('entries-list');
const newEntryBtn = document.getElementById('new-entry-btn');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const charCount = document.getElementById('char-count');
const toast = document.getElementById('toast');

// LocalStorage Key
const STORAGE_KEY = 'seetup_diary_entries';

// Current active entry (for editing)
let activeEntryId = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    setupEventListeners();
    updateCharCount();
});

// Setup event listeners
function setupEventListeners() {
    saveBtn.addEventListener('click', saveEntry);
    newEntryBtn.addEventListener('click', createNewEntry);
    menuToggle.addEventListener('click', toggleSidebar);
    
    // Update character count on input
    diaryInput.addEventListener('input', updateCharCount);
    
    // Allow saving with Ctrl+Enter or Cmd+Enter
    diaryInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            saveEntry();
        }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
}

// Toggle sidebar on mobile
function toggleSidebar() {
    sidebar.classList.toggle('open');
}

// Update character count
function updateCharCount() {
    const count = diaryInput.value.length;
    charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
}

// Create new entry (clear input)
function createNewEntry() {
    activeEntryId = null;
    diaryInput.value = '';
    diaryInput.focus();
    updateCharCount();
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
    
    // Remove active class from all entries
    document.querySelectorAll('.entry-item').forEach(item => {
        item.classList.remove('active');
    });
}

// Save a diary entry
function saveEntry() {
    const text = diaryInput.value.trim();
    
    if (!text) {
        showToast('Please write something before saving!', 'error');
        return;
    }
    
    // Get existing entries
    const entries = getEntries();
    
    if (activeEntryId) {
        // Update existing entry
        const entryIndex = entries.findIndex(entry => entry.id === activeEntryId);
        if (entryIndex !== -1) {
            entries[entryIndex].text = text;
            entries[entryIndex].updatedAt = new Date().toISOString();
        }
    } else {
        // Create new entry
        const entry = {
            id: Date.now(),
            text: text,
            date: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add new entry at the beginning (newest first)
        entries.unshift(entry);
    }
    
    // Save to localStorage
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        
        // Refresh the display
        displayEntries();
        
        // Show success message
        showToast(activeEntryId ? 'Entry updated successfully!' : 'Entry saved successfully!', 'success');
        
        // Clear input and reset active entry
        if (!activeEntryId) {
            diaryInput.value = '';
            updateCharCount();
        }
    } catch (error) {
        console.error('Error saving entry:', error);
        showToast('Failed to save entry. Please try again.', 'error');
    }
}

// Get all entries from localStorage
function getEntries() {
    try {
        const entriesJson = localStorage.getItem(STORAGE_KEY);
        return entriesJson ? JSON.parse(entriesJson) : [];
    } catch (error) {
        console.error('Error reading entries:', error);
        return [];
    }
}

// Load and display all entries
function loadEntries() {
    displayEntries();
}

// Display all entries in the sidebar
function displayEntries() {
    const entries = getEntries();
    
    // Clear the container
    entriesList.innerHTML = '';
    
    if (entries.length === 0) {
        // Show empty state
        entriesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p class="empty-state-text">No entries yet. Start writing your first diary entry!</p>
            </div>
        `;
        return;
    }
    
    // Create and append entry elements
    entries.forEach((entry, index) => {
        const entryElement = createEntryElement(entry, index);
        entriesList.appendChild(entryElement);
    });
}

// Create a single entry element for sidebar
function createEntryElement(entry, index) {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry-item';
    entryDiv.dataset.id = entry.id;
    
    // Add animation class for new entries
    if (index === 0) {
        entryDiv.classList.add('new');
    }
    
    // Mark as active if it's the current entry
    if (entry.id === activeEntryId) {
        entryDiv.classList.add('active');
    }
    
    // Format the date
    const formattedDate = formatDate(entry.date);
    
    // Get preview text (first 50 characters)
    const previewText = entry.text.substring(0, 50) + (entry.text.length > 50 ? '...' : '');
    
    entryDiv.innerHTML = `
        <div class="entry-item-header">
            <span class="entry-item-date">${formattedDate}</span>
            <button class="entry-item-delete" onclick="deleteEntry(${entry.id})" aria-label="Delete entry" title="Delete entry">
                🗑️
            </button>
        </div>
        <div class="entry-item-preview">${escapeHtml(previewText)}</div>
    `;
    
    // Click to load entry for editing
    entryDiv.addEventListener('click', (e) => {
        // Don't trigger if clicking delete button
        if (!e.target.classList.contains('entry-item-delete')) {
            loadEntryForEditing(entry.id);
        }
    });
    
    return entryDiv;
}

// Load entry for editing
function loadEntryForEditing(id) {
    const entries = getEntries();
    const entry = entries.find(e => e.id === id);
    
    if (entry) {
        activeEntryId = id;
        diaryInput.value = entry.text;
        diaryInput.focus();
        updateCharCount();
        
        // Update active state in sidebar
        document.querySelectorAll('.entry-item').forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.dataset.id) === id) {
                item.classList.add('active');
            }
        });
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    }
}

// Delete an entry
function deleteEntry(id) {
    if (!confirm('Are you sure you want to delete this entry?')) {
        return;
    }
    
    try {
        const entries = getEntries();
        const filteredEntries = entries.filter(entry => entry.id !== id);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
        
        // If deleting the active entry, clear the input
        if (activeEntryId === id) {
            activeEntryId = null;
            diaryInput.value = '';
            updateCharCount();
        }
        
        displayEntries();
        showToast('Entry deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting entry:', error);
        showToast('Failed to delete entry. Please try again.', 'error');
    }
}

// Format date for display
function formatDate(isoString) {
    const date = new Date(isoString);
    
    const options = {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make deleteEntry available globally
window.deleteEntry = deleteEntry;

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
