// Mood Mirror - Daily Mood Checker Web App
// Main JavaScript functionality

class MoodMirror {
    constructor() {
        this.currentMood = null;
        this.moodData = {
            happy: {
                icon: '😊',
                color: 'happy',
                quotes: [
                    "Keep smiling, it makes people wonder what you're up to.",
                    "Happiness is not something ready made. It comes from your own actions.",
                    "The best way to cheer yourself up is to try to cheer somebody else up.",
                    "Every day may not be good, but there's something good in every day.",
                    "Choose to be optimistic, it feels better."
                ]
            },
            sad: {
                icon: '😢',
                color: 'sad',
                quotes: [
                    "It's okay to feel not okay.",
                    "Tears are words that need to be written.",
                    "Sometimes you need to sit lonely on the floor in a quiet room in order to hear your own voice.",
                    "The cure for anything is salt water: sweat, tears, or the sea.",
                    "It's okay to not be okay as long as you don't stay that way."
                ]
            },
            angry: {
                icon: '😠',
                color: 'angry',
                quotes: [
                    "Take a deep breath and let it go.",
                    "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.",
                    "When angry, count to ten before you speak. If very angry, count to one hundred.",
                    "The best fighter is never angry.",
                    "You will not be punished for your anger; you will be punished by your anger."
                ]
            },
            tired: {
                icon: '😴',
                color: 'tired',
                quotes: [
                    "Rest if you must, but don't quit.",
                    "Take rest; a field that has rested gives a bountiful crop.",
                    "Sometimes the most productive thing you can do is relax.",
                    "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit.",
                    "Your body needs rest. Your mind needs peace. Your soul needs quiet."
                ]
            },
            excited: {
                icon: '🤩',
                color: 'excited',
                quotes: [
                    "Let your excitement be louder than your fears.",
                    "Enthusiasm is the electricity of life.",
                    "Nothing great was ever achieved without enthusiasm.",
                    "The way to get started is to quit talking and begin doing.",
                    "Excitement is the more practical synonym for happiness, and it is precisely what you should strive to chase."
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadLastMood();
        this.updateLastMoodDisplay();
    }

    bindEvents() {
        // Add event listeners to mood buttons
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const mood = e.currentTarget.getAttribute('data-mood');
                this.selectMood(mood);
            });

            // Add keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const mood = e.currentTarget.getAttribute('data-mood');
                    this.selectMood(mood);
                }
            });
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            const buttons = Array.from(document.querySelectorAll('.mood-btn'));
            const currentIndex = buttons.findIndex(btn => btn === document.activeElement);
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % buttons.length;
                buttons[nextIndex].focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = currentIndex === -1 ? 0 : (currentIndex - 1 + buttons.length) % buttons.length;
                buttons[prevIndex].focus();
            }
        });
    }

    selectMood(mood) {
        if (!this.moodData[mood]) {
            console.error('Invalid mood selected:', mood);
            return;
        }

        // Store current mood
        this.currentMood = mood;
        
        // Update visual elements
        this.updateMoodDisplay(mood);
        this.updateBackground(mood);
        this.updateActiveButton(mood);
        
        // Save to localStorage
        this.saveMood(mood);
        
        // Update last mood display
        this.updateLastMoodDisplay();
        
        // Add change animation
        this.triggerChangeAnimation();
        
        // Log mood selection (for analytics if needed)
        this.logMoodSelection(mood);
    }

    updateMoodDisplay(mood) {
        const moodData = this.moodData[mood];
        const moodIcon = document.getElementById('moodIcon');
        const moodText = document.getElementById('moodText');
        const motivationalQuote = document.getElementById('motivationalQuote');
        
        // Update mood icon and text
        moodIcon.textContent = moodData.icon;
        moodText.textContent = `Feeling ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
        
        // Select random quote from the mood's quotes array
        const randomQuote = moodData.quotes[Math.floor(Math.random() * moodData.quotes.length)];
        motivationalQuote.textContent = `"${randomQuote}"`;
        
        // Add pulse effect to icon
        moodIcon.classList.add('pulse');
        setTimeout(() => {
            moodIcon.classList.remove('pulse');
        }, 1000);
    }

    updateBackground(mood) {
        const body = document.body;
        
        // Remove all mood classes
        body.classList.remove('happy', 'sad', 'angry', 'tired', 'excited');
        
        // Add new mood class
        body.classList.add(mood);
    }

    updateActiveButton(mood) {
        // Remove active class from all buttons
        const buttons = document.querySelectorAll('.mood-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected button
        const selectedButton = document.querySelector(`[data-mood="${mood}"]`);
        if (selectedButton) {
            selectedButton.classList.add('active');
        }
    }

    triggerChangeAnimation() {
        const moodDisplay = document.getElementById('moodDisplay');
        moodDisplay.classList.add('changing');
        
        setTimeout(() => {
            moodDisplay.classList.remove('changing');
        }, 600);
    }

    saveMood(mood) {
        try {
            const moodEntry = {
                mood: mood,
                timestamp: new Date().toISOString(),
                date: new Date().toDateString()
            };
            
            // Save current mood
            localStorage.setItem('currentMood', JSON.stringify(moodEntry));
            
            // Save to mood history
            this.saveMoodHistory(moodEntry);
            
        } catch (error) {
            console.error('Error saving mood to localStorage:', error);
        }
    }

    saveMoodHistory(moodEntry) {
        try {
            let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
            
            // Limit history to last 30 entries
            moodHistory.unshift(moodEntry);
            if (moodHistory.length > 30) {
                moodHistory = moodHistory.slice(0, 30);
            }
            
            localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
        } catch (error) {
            console.error('Error saving mood history:', error);
        }
    }

    loadLastMood() {
        try {
            const savedMood = localStorage.getItem('currentMood');
            if (savedMood) {
                const moodEntry = JSON.parse(savedMood);
                
                // Check if the saved mood is from today
                const today = new Date().toDateString();
                const savedDate = new Date(moodEntry.timestamp).toDateString();
                
                if (savedDate === today && this.moodData[moodEntry.mood]) {
                    this.selectMood(moodEntry.mood);
                }
            }
        } catch (error) {
            console.error('Error loading last mood from localStorage:', error);
        }
    }

    updateLastMoodDisplay() {
        try {
            const lastMoodElement = document.getElementById('lastMoodText');
            const savedMood = localStorage.getItem('currentMood');
            
            if (savedMood) {
                const moodEntry = JSON.parse(savedMood);
                const moodDate = new Date(moodEntry.timestamp);
                const formattedTime = moodDate.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
                lastMoodElement.textContent = `${moodEntry.mood.charAt(0).toUpperCase() + moodEntry.mood.slice(1)} at ${formattedTime}`;
            } else {
                lastMoodElement.textContent = 'None';
            }
        } catch (error) {
            console.error('Error updating last mood display:', error);
            document.getElementById('lastMoodText').textContent = 'None';
        }
    }

    logMoodSelection(mood) {
        // Log mood selection with timestamp for potential analytics
        console.log(`Mood selected: ${mood} at ${new Date().toISOString()}`);
        
        // Dispatch custom event for potential future integrations
        const moodEvent = new CustomEvent('moodSelected', {
            detail: {
                mood: mood,
                timestamp: new Date().toISOString(),
                moodData: this.moodData[mood]
            }
        });
        
        document.dispatchEvent(moodEvent);
    }

    // Public methods for potential future enhancements
    getMoodHistory() {
        try {
            return JSON.parse(localStorage.getItem('moodHistory') || '[]');
        } catch (error) {
            console.error('Error retrieving mood history:', error);
            return [];
        }
    }

    clearMoodHistory() {
        try {
            localStorage.removeItem('moodHistory');
            localStorage.removeItem('currentMood');
            console.log('Mood history cleared');
        } catch (error) {
            console.error('Error clearing mood history:', error);
        }
    }

    getCurrentMood() {
        return this.currentMood;
    }

    // Method to add custom quotes (for future enhancement)
    addCustomQuote(mood, quote) {
        if (this.moodData[mood] && quote && quote.trim()) {
            this.moodData[mood].quotes.push(quote.trim());
            console.log(`Custom quote added to ${mood}: ${quote}`);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Mood Mirror app
    window.moodMirror = new MoodMirror();
    
    // Add some helpful console messages for developers
    console.log('🌟 Mood Mirror App initialized!');
    console.log('💡 Available methods:');
    console.log('   - moodMirror.getMoodHistory() - Get mood history');
    console.log('   - moodMirror.clearMoodHistory() - Clear mood history');
    console.log('   - moodMirror.getCurrentMood() - Get current mood');
    console.log('   - moodMirror.addCustomQuote(mood, quote) - Add custom quote');
});

// Add error handling for localStorage issues
window.addEventListener('storage', (e) => {
    if (e.key === 'currentMood' && window.moodMirror) {
        window.moodMirror.updateLastMoodDisplay();
    }
});

// Handle visibility change to update mood display when tab becomes visible
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.moodMirror) {
        window.moodMirror.updateLastMoodDisplay();
    }
});

// Export for potential future module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MoodMirror;
}
