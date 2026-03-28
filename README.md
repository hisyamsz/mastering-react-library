# Mastering React Library 🚀

Repositori ini berisi kumpulan implementasi praktis dan eksplorasi berbagai library populer di ekosistem React. Fokus utama proyek ini adalah mempelajari integrasi antar library, manajemen state, validasi form, dan pengambilan data secara efisien.

## 🛠️ Stack Teknologi

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Server State:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Struktur Proyek

Proyek ini dibagi menjadi beberapa modul pembelajaran:

### 1. React Form & Data Validation

Implementasi form yang _type-safe_ menggunakan React Hook Form dan Zod.

- **Reusable Form Component:** Penggunaan TypeScript Generics (`<T>`) untuk membuat komponen Form yang bisa digunakan berulang kali.
- **Schema Validation:** Validasi sisi klien yang ketat dengan Zod.
- **Automatic Class Sorting:** Integrasi Prettier plugin untuk merapikan class Tailwind secara otomatis.

### 2. React Query Introduction

Eksplorasi manajemen server state untuk aplikasi yang lebih responsif.

- **useQuery:** Mengambil data dari API publik (Fake Store API).
- **useMutation:** Menangani pengiriman data (Login) dan sinkronisasi state aplikasi.

### 3. React Context Introduction

Mempelajari manajemen state global sederhana menggunakan built-in Context API dari React untuk menghindari _prop drilling_.

---

## 🚀 Fitur Utama pada Reusable Form

Salah satu pencapaian utama dalam proyek ini adalah pembuatan komponen `Form.tsx` yang sangat fleksibel:

```typescript
// Contoh penggunaan komponen Form yang sudah mendukung Generics
<Form
  schema={loginSchema}
  onSubmit={onLogin}
  fields={[
    { name: "username", label: "Username", placeholder: "..." },
    { name: "password", label: "Password", type: "password" }
  ]}
  isLoading={isPending}
/>
```
