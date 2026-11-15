# SprintOps — Task Management REST API

SprintOps, yazılım geliştirme ekiplerinin görevlerini yönetmek amacıyla Node.js ve Express.js kullanılarak geliştirilmiş bir REST API projesidir.

Proje, **Node.js Backend Programlama Eğitimi Bitirme Projesi** kapsamında geliştirilmiştir.

## Projenin Amacı

SprintOps, bir yazılım şirketinde çalışanların görevlerini oluşturmak, çalışanlara atamak, güncellemek ve takip etmek için temel bir backend altyapısı sunar.

Proje kapsamında REST API mimarisi, HTTP metodları, CRUD operasyonları, Express Router, JSON veri yönetimi ve Middleware kullanımı uygulanmıştır.

## Kullanılan Teknolojiler

- **Node.js:** JavaScript backend çalışma ortamı
- **Express.js:** REST API ve sunucu geliştirme
- **Express Router:** API endpoint'lerinin modüler yönetimi
- **Node.js File System (fs):** JSON dosyası üzerinden veri okuma ve yazma
- **Postman:** API endpoint'lerinin test edilmesi

## Özellikler

- Yeni görev oluşturma
- Bütün görevleri listeleme
- Görev ID'sine göre detay görüntüleme
- Görev bilgilerini güncelleme
- Görev silme
- Çalışan atama
- Görev önceliği ve durum takibi
- Logger Middleware ile HTTP isteklerini kaydetme
- Bulunamayan görevler için 404 hata yanıtı

## Proje Klasör Yapısı

```text
sprintops/
├── data/
│   └── tasks.json
├── routes/
│   └── taskRoutes.js
├── middleware/
│   └── logger.js
├── utils/
│   └── taskStorage.js
├── docs/
│   └── SprintOps_backendprojesi.pdf
├── screenshots/
│   ├── 01-post-create-task.png
│   ├── 02-get-task-detail.png
│   ├── 03-get-all-tasks.png
│   ├── 04-put-update-task.png
│   └── 05-delete-task.png
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

### Dosya ve Klasör Açıklamaları

| Dosya / Klasör | Açıklama |
|---|---|
| `server.js` | Express sunucusunu başlatır ve API routing işlemlerini bağlar. |
| `routes/taskRoutes.js` | Görevlerle ilgili CRUD endpoint'lerini içerir. |
| `middleware/logger.js` | HTTP isteklerinin tarihini, metodunu ve adresini kaydeder. |
| `utils/taskStorage.js` | Görev verilerinin JSON dosyasından okunmasını ve dosyaya kaydedilmesini sağlar. |
| `data/tasks.json` | Görev kayıtlarını saklar. |
| `docs/` | Proje tanıtım dokümanını içerir. |
| `screenshots/` | Postman test ekran görüntülerini içerir. |

## Kurulum ve Çalıştırma

### 1. Gereksinimler

Bilgisayarınızda Node.js ve npm kurulu olmalıdır.

### 2. Projeyi indirin

GitHub üzerinden proje dosyalarını indirin ve proje klasörünü açın.

### 3. Bağımlılıkları yükleyin

Terminalde proje klasörüne girerek aşağıdaki komutu çalıştırın:

```bash
npm install
```

### 4. Sunucuyu başlatın

```bash
npm start
# veya
node server.js
```

Sunucu varsayılan olarak aşağıdaki adreste çalışır:

`http://localhost:3000`

### 5. API'yi kontrol edin

Tarayıcınızdan veya Postman üzerinden aşağıdaki adrese GET isteği gönderin:

`http://localhost:3000/`

Başarılı yanıt:

```json
{
  "message": "SprintOps API çalışıyor!"
}
```

## API Endpoint'leri

| HTTP Method | Endpoint | Açıklama | Başarılı Yanıt |
|---|---|---|---|
| GET | `/` | Sunucu durumunu kontrol eder | 200 OK |
| GET | `/tasks` | Tüm görevleri listeler | 200 OK |
| GET | `/tasks/:id` | Belirtilen görevi getirir | 200 OK |
| POST | `/tasks` | Yeni görev oluşturur | 201 Created |
| PUT | `/tasks/:id` | Mevcut görevi günceller | 200 OK |
| DELETE | `/tasks/:id` | Belirtilen görevi siler | 200 OK |

Bulunamayan görevlerin detay, güncelleme veya silme isteklerinde `404 Not Found` yanıtı döndürülür.

## API Kullanım Örnekleri

### 1. Yeni Görev Oluşturma

**POST** `/tasks`

Request Body:

```json
{
  "title": "Login hatasını düzelt",
  "description": "Kullanıcı girişindeki hata giderilecek",
  "assignee": "Ahmet",
  "priority": "high"
}
```

Başarılı işlem sonucunda yeni görev oluşturulur. Göreve otomatik olarak ID, oluşturulma tarihi ve `pending` durumu atanır.

### 2. Görevleri Listeleme

**GET** `/tasks`

Sistemde kayıtlı bütün görevleri JSON dizisi olarak döndürür.

### 3. Görev Detayını Görüntüleme

**GET** `/tasks/1`

ID değeri 1 olan görevin bilgilerini döndürür.

### 4. Görev Güncelleme

**PUT** `/tasks/1`

Request Body:

```json
{
  "status": "in-progress",
  "priority": "high"
}
```

Yalnızca gönderilen alanlar güncellenir. Diğer görev bilgileri korunur.

### 5. Görev Silme

**DELETE** `/tasks/1`

Belirtilen görevi sistemden kaldırır ve silinen görevin bilgilerini döndürür.

## Görev Veri Modeli

Sistemdeki her görev aşağıdaki alanları içerir:

| Alan | Açıklama |
|---|---|
| `id` | Görev numarası |
| `title` | Görev başlığı |
| `description` | Görev açıklaması |
| `assignee` | Görevin atandığı çalışan |
| `priority` | Öncelik seviyesi |
| `status` | Görevin mevcut durumu |
| `createdAt` | Oluşturulma tarihi |

Görevler `data/tasks.json` dosyasında saklanır.

## Logger Middleware

Proje kapsamında özel bir Logger Middleware geliştirilmiştir.

Middleware, sunucuya gelen HTTP istekleri için aşağıdaki bilgileri terminale kaydeder:

- İstek tarihi ve saati
- HTTP metodu
- İstek endpoint'i

Örnek terminal çıktısı:

```text
[2026-11-10T14:12:29.827Z] GET /tasks
[2026-11-10T14:12:47.965Z] GET /tasks/1
```

Logger, `middleware/logger.js` dosyasında tanımlanmış ve `server.js` içerisinde uygulamaya eklenmiştir.

## Test Süreci

API işlemleri Postman kullanılarak test edilmiştir.

| Test | Beklenen HTTP Kodu | Sonuç |
|---|---|---|
| Görev oluşturma | 201 Created | Başarılı |
| Görev listeleme | 200 OK | Başarılı |
| Görev detayı | 200 OK | Başarılı |
| Görev güncelleme | 200 OK | Başarılı |
| Görev silme | 200 OK | Başarılı |
| Silinen görevi sorgulama | 404 Not Found | Başarılı |

Test ekran görüntüleri `screenshots/` klasöründe yer almaktadır.

## Proje Kapsamı ve Sınırlamalar

Bu proje temel backend geliştirme becerilerini göstermek amacıyla hazırlanmıştır.

- Sistem yalnızca REST API olarak geliştirilmiştir.
- Frontend arayüzü bulunmamaktadır.
- Görevler JSON dosyası üzerinden saklanmaktadır.
- Kullanıcı kimlik doğrulama sistemi bulunmamaktadır.
- Gelişmiş filtreleme, raporlama ve validation middleware özellikleri mevcut sürümün kapsamı dışındadır.

## Sonuç

SprintOps ile Node.js ve Express.js kullanılarak modüler bir görev yönetimi REST API'si geliştirilmiştir.

Proje kapsamında CRUD operasyonları, Express Router, Logger Middleware, JSON veri yönetimi ve Postman ile API testleri başarıyla uygulanmıştır.

Sistem, ilerleyen aşamalarda veritabanı entegrasyonu, kullanıcı yetkilendirme, veri doğrulama ve raporlama özellikleriyle genişletilebilir.