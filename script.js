// 1. Event Listener saat DOM sudah dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // 2. Deklarasi variabel global
    const menuIcon = document.querySelector('#menu-icon');        // Mengambil elemen hamburger menu
    const navbar = document.querySelector('.navbar');             // Mengambil elemen navbar
    const navLinks = document.querySelectorAll('.navbar a');      // Mengambil semua link dalam navbar
    const sections = document.querySelectorAll('section');        // Mengambil semua section dalam halaman

    // 3. Toggle Menu Mobile
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');      // Toggle class 'bx-x' untuk animasi icon
        navbar.classList.toggle('active');       // Toggle class 'active' untuk menampilkan/sembunyikan menu
    }

    // 4. Event untuk menutup menu saat link diklik
    navLinks.forEach(link => {
        link.onclick = () => {
            menuIcon.classList.remove('bx-x');   // Menghapus class 'bx-x' dari icon
            navbar.classList.remove('active');    // Menutup menu dengan menghapus class 'active'
        }
    });

    // 5. Fungsi untuk mengatur active class pada link navbar
    function setActiveLink() {
        const scrollPosition = window.scrollY;   // Mendapatkan posisi scroll

        sections.forEach(section => {
            // Mengambil posisi dan dimensi setiap section
            const sectionTop = section.offsetTop - 150;           // Posisi atas section (dikurangi offset)
            const sectionHeight = section.offsetHeight;           // Tinggi section
            const id = section.getAttribute('id');                // ID section

            // Mengecek apakah user sedang berada di section ini
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update active class pada link yang sesuai
                navLinks.forEach(link => {
                    link.classList.remove('active');              // Hapus semua active class
                    if(link.getAttribute('href') === '#' + id) {  // Jika link mengarah ke section ini
                        link.classList.add('active');             // Tambah active class
                    }
                });
            }
        });
    }

    // 6. Event listener untuk scroll
    window.onscroll = setActiveLink;    // Jalankan setActiveLink saat user scroll
    
    // 7. Set active link saat pertama kali dimuat
    setActiveLink();    // Jalankan setActiveLink saat halaman dimuat

    // 8. Close menu ketika klik di luar menu (Hamburger Menu)
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
            menuIcon.classList.remove('bx-x');   // Menghapus class 'bx-x' dari icon
            navbar.classList.remove('active');   // Menutup menu
        }
    });
});
// Untuk serifikat
function openModal(src) {
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modal-pdf').src = src;
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
