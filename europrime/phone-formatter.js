function formatBrazilianPhone(value) {
    // Remove all non-digits
    value = value.replace(/\D/g, '');
    
    // Check if it's a toll-free number (0800, 0300, etc.)
    if (value.substring(0, 2) === '08' || value.substring(0, 2) === '03') {
        if (value.length <= 4) {
            return value;
        } else if (value.length <= 7) {
            return value.substring(0, 4) + ' ' + value.substring(4);
        } else if (value.length <= 11) {
            return value.substring(0, 4) + ' ' + value.substring(4, 7) + ' ' + value.substring(7);
        }
    }
    
    // Regular phone numbers
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

// Apply formatter when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Select all phone inputs by class name
    const phoneInputs = document.querySelectorAll('.phone-br, .brazilian-phone, input[type="tel"]');
    
    phoneInputs.forEach(function(input) {
        input.addEventListener('input', function(e) {
            const cursorPosition = e.target.selectionStart;
            const oldValue = e.target.value;
            const newValue = formatBrazilianPhone(oldValue);
            
            e.target.value = newValue;
            
            // Maintain cursor position
            const diff = newValue.length - oldValue.length;
            e.target.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
        });
        
        // Format on blur to ensure proper formatting
        input.addEventListener('blur', function(e) {
            e.target.value = formatBrazilianPhone(e.target.value);
        });
    });
});