<template>
  <q-page class="bg-grey-2">
    <!-- Hero Section -->
    <div class="hero flex flex-center column">
      <h1 class="text-h3 text-white text-bold text-center">WinePOS: Solusi Kasir Modern</h1>
      <p class="text-subtitle1 text-white text-center q-mt-sm">Kelola bisnis retail dengan mudah, cepat, dan efisien dengan sistem POS canggih.</p>
      <q-btn color="primary" glossy size="lg" label="Coba Gratis" class="q-mt-md" @click="goToPricing" />
    </div>

    <!-- Fitur -->
    <div class="q-mt-xl text-center">
      <h2 class="text-h4 text-primary">🚀 Fitur Unggulan</h2>
      <div class="row justify-center q-mt-md q-gutter-md">
        <q-card v-for="(fitur, index) in fiturList" :key="index" class="feature-card">
          <q-card-section>
            <q-icon :name="fitur.icon" color="primary" size="lg" />
            <h3 class="text-h6 q-mt-sm">{{ fitur.title }}</h3>
            <p class="text-subtitle2 text-grey">{{ fitur.description }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Demo Screenshot -->
    <div class="q-mt-xl text-center">
      <h2 class="text-h4 text-primary">🎨 Tampilan WinePOS</h2>
      <q-img src="/statics/demo-pos.png" class="q-mt-md demo-img shadow-3" />
    </div>

    <!-- Testimoni -->
    <div class="q-mt-xl text-center">
      <h2 class="text-h4 text-primary">💬 Apa Kata Mereka?</h2>
      <q-carousel v-model="slide" swipeable animated autoplay interval="5000" height="250px" class="q-mt-md">
        <q-carousel-slide v-for="(testi, index) in testimoni" :key="index" :name="index">
          <q-card class="testimoni-card">
            <q-card-section class="text-center">
              <q-avatar size="80px">
                <img :src="testi.avatar" />
              </q-avatar>
              <p class="text-h6 q-mt-md">{{ testi.nama }}</p>
              <p class="text-subtitle2 text-grey-7">{{ testi.pekerjaan }}</p>
              <q-separator class="q-my-md" />
              <p class="text-subtitle1 text-grey-8">"{{ testi.komentar }}"</p>
            </q-card-section>
          </q-card>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!-- Pricing -->
    <div class="q-mt-xl text-center">
      <h2 class="text-h4 text-primary">💲 Pilih Paket</h2>
      <div class="row justify-center q-mt-md q-gutter-md">
        <q-card v-for="(paket, index) in pricing" :key="index" class="pricing-card shadow-4">
          <q-card-section>
            <h3 class="text-h6">{{ paket.name }}</h3>
            <p class="text-h5 text-primary">{{ paket.price }}</p>
            <q-btn color="primary" glossy label="Pilih" class="q-mt-md" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Footer -->
    <q-footer class="q-pa-md text-center bg-primary text-white">
      <p>&copy; 2025 WinePOS - Semua Hak Dilindungi</p>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      fiturList: [
        { icon: 'shopping_cart', title: 'Manajemen Produk', description: 'Tambah, edit, dan kelola stok dengan mudah.' },
        { icon: 'bar_chart', title: 'Laporan Penjualan', description: 'Pantau transaksi secara real-time.' },
        { icon: 'credit_card', title: 'Multi Pembayaran', description: 'Dukung tunai, e-wallet, kartu kredit.' }
      ],
      testimoni: [
        { nama: 'Andi Wijaya', pekerjaan: 'Pemilik Toko Sembako', komentar: 'WinePOS sangat membantu bisnis saya!', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { nama: 'Siti Rahma', pekerjaan: 'Owner Butik Fashion', komentar: 'Sistemnya cepat dan stabil. Rekomendasi banget!', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
        { nama: 'Budi Santoso', pekerjaan: 'Manajer Restoran', komentar: 'Fitur laporan penjualannya sangat detail dan akurat.', avatar: 'https://randomuser.me/api/portraits/men/50.jpg' }
      ],
      pricing: [
        { name: 'Basic', price: 'Rp99.000/bulan' },
        { name: 'Pro', price: 'Rp199.000/bulan' }
      ]
    }
  }
}
</script>

<style scoped>
.hero {
  height: 60vh;
  background: linear-gradient(135deg, #1e88e5, #1565c0);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  animation: fadeIn 1.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card,
.pricing-card {
  width: 250px;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.feature-card:hover,
.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
}

.demo-img {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  transition: transform 0.3s;
}

.demo-img:hover {
  transform: scale(1.05);
}

.testimoni-card {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
