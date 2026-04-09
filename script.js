document.addEventListener('DOMContentLoaded', function() {
    // Edit Modal Functionality
    const modal = document.getElementById('editModal');
    const closeBtn = document.querySelector('.close');
    const saveBtn = document.getElementById('saveChanges');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const editTitle = document.getElementById('editTitle');
    const editPrice = document.getElementById('editPrice');
    
    let currentEditingElement = null;
    let currentImageElement = null;

    // Make product images editable
    const editableImages = document.querySelectorAll('.editable-image');
    editableImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            currentEditingElement = this.closest('.product-card') || this.closest('.category-card');
            currentImageElement = this;
            
            // Set current values in modal
            imagePreview.src = this.src;
            
            if (this.closest('.product-card')) {
                const productTitle = currentEditingElement.querySelector('.editable-text');
                const productPrice = currentEditingElement.querySelector('.editable-text:last-child');
                
                editTitle.value = productTitle.textContent;
                editPrice.value = productPrice.textContent;
                
                // Show all fields for products
                document.querySelectorAll('.edit-section').forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                // Hide text fields for categories
                document.querySelectorAll('.edit-section').forEach((section, index) => {
                    if (index > 0) section.style.display = 'none';
                });
            }
            
            modal.style.display = 'block';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle image upload
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Save changes
    saveBtn.addEventListener('click', function() {
        if (currentEditingElement && currentImageElement) {
            // Update image
            currentImageElement.src = imagePreview.src;
            
            // Update text if it's a product card
            if (currentEditingElement.classList.contains('product-card')) {
                const productTitle = currentEditingElement.querySelector('.editable-text');
                const productPrice = currentEditingElement.querySelector('.editable-text:last-child');
                
                productTitle.textContent = editTitle.value;
                productPrice.textContent = editPrice.value;
            }
            
            modal.style.display = 'none';
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
    });
});