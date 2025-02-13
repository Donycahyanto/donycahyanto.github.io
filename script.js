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
let images = [
    "Sertifikat1/sertifikat1.pdf.png",
    "Sertifikat1/sertifikat2.pdf.png",
    "Sertifikat1/sertifikat3.pdf.png",
    "Sertifikat1/sertifikat4.pdf.png",
    "Sertifikat1/sertifikat5.pdf.png"
  ];
  let currentIndex = 0;
  
  function openModal(index) {
    currentIndex = index;
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modal-img").src = images[currentIndex];
  }
  
  function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal-img").src = "";
  }
  
  // Navigasi Next & Previous
  function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    document.getElementById("modal-img").src = images[currentIndex];
  }
  
  // Tutup modal saat klik di luar konten
  document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
      closeModal();
    }
  });
  
  // Navigasi keyboard (panah kiri/kanan untuk geser gambar)
  document.addEventListener("keydown", function(event) {
    if (document.getElementById("modal").style.display === "flex") {
      if (event.key === "ArrowRight") {
        changeImage(1);
      } else if (event.key === "ArrowLeft") {
        changeImage(-1);
      } else if (event.key === "Escape") {
        closeModal();
      }
    }
  });
  // ✨ Menambahkan Gesture Swipe untuk Mobile
document.getElementById("modal").addEventListener("touchstart", function(event) {
    touchStartX = event.changedTouches[0].clientX;
  });
  
  document.getElementById("modal").addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    let swipeThreshold = 50; // Minimum jarak geser agar dianggap sebagai swipe
    if (touchStartX - touchEndX > swipeThreshold) {
      changeImage(1); // Geser ke kanan (next)
    } else if (touchEndX - touchStartX > swipeThreshold) {
      changeImage(-1); // Geser ke kiri (prev)
    }
  }