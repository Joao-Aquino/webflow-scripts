<script>
// Brazilian Phone Formatter with Character Limiting
function formatBrazilianPhone(value) {
    // Remove all non-digits
    value = value.replace(/\D/g, '');
    
    // Check if it's a toll-free number (0800, 0300, etc.)
    if (value.substring(0, 2) === '08' || value.substring(0, 2) === '03') {
        // Limit to 11 digits for toll-free
        value = value.substring(0, 11);
        
        if (value.length <= 4) {
            return value;
        } else if (value.length <= 7) {
            return value.substring(0, 4) + ' ' + value.substring(4);
        } else {
            return value.substring(0, 4) + ' ' + value.substring(4, 7) + ' ' + value.substring(7);
        }
    }
    
    // Check if it's a mobile (starts with 9 after area code)
    const isMobile = value.length > 2 && value.charAt(2) === '9';
    
    // Apply appropriate limit
    if (isMobile) {
        value = value.substring(0, 11); // 11 digits for mobile
    } else {
        value = value.substring(0, 10); // 10 digits for landline
    }
    
    // Format the number
    if (value.length <= 2) {
        return value;
    } else if (value.length <= 6) {
        return '(' + value.substring(0, 2) + ') ' + value.substring(2);
    } else if (value.length <= 10) {
        return '(' + value.substring(0, 2) + ') ' + value.substring(2, 6) + '-' + value.substring(6);
    } else if (value.length === 11) {
        return '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
    }
    
    return value;
}

// Get maximum formatted length based on number type
function getMaxLength(value) {
    const digits = value.replace(/\D/g, '');
    
    // Toll-free numbers
    if (digits.substring(0, 2) === '08' || digits.substring(0, 2) === '03') {
        return 13; // "0800 123 4567"
    }
    
    // Mobile numbers (9 digits after area code)
    if (digits.length > 2 && digits.charAt(2) === '9') {
        return 15; // "(11) 98765-4321"
    }
    
    // Landline numbers (8 digits after area code)
    return 14; // "(11) 3456-7890"
}

// Apply formatter when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Select ONLY inputs with the phone-brazil attribute
    const phoneInputs = document.querySelectorAll('[phone-brazil]');
    
    phoneInputs.forEach(function(input) {
        // Set initial max length
        input.setAttribute('maxlength', '15');
        
        // Format on input
        input.addEventListener('input', function(e) {
            const cursorPosition = e.target.selectionStart;
            const oldValue = e.target.value;
            const newValue = formatBrazilianPhone(oldValue);
            
            // Update max length dynamically based on number type
            const maxLen = getMaxLength(newValue);
            e.target.setAttribute('maxlength', maxLen);
            
            // Apply formatted value
            e.target.value = newValue;
            
            // Maintain cursor position
            const diff = newValue.length - oldValue.length;
            e.target.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
        });
        
        // Format on blur for final cleanup
        input.addEventListener('blur', function(e) {
            e.target.value = formatBrazilianPhone(e.target.value);
        });
        
        // Format on paste
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = (e.clipboardData || window.clipboardData).getData('text');
            const formatted = formatBrazilianPhone(pastedData);
            e.target.value = formatted;
            
            // Update max length after paste
            const maxLen = getMaxLength(formatted);
            e.target.setAttribute('maxlength', maxLen);
        });
        
        // Prevent typing beyond limit
        input.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            const currentValue = e.target.value;
            const isNumber = /[0-9]/.test(char);
            
            // Allow backspace, delete, tab, escape, enter
            if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1) {
                return;
            }
            
            // Only allow numbers
            if (!isNumber) {
                e.preventDefault();
                return;
            }
            
            // Check if we're at the limit
            const digits = currentValue.replace(/\D/g, '');
            const maxDigits = digits.substring(0, 2) === '08' || digits.substring(0, 2) === '03' ? 11 :
                             (digits.length > 2 && digits.charAt(2) === '9' ? 11 : 10);
            
            if (digits.length >= maxDigits) {
                e.preventDefault();
            }
        });
    });
});
</script>