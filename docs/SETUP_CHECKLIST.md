# ✅ PHP & MySQL Setup Checklist

## 📋 Pre-requisites Check

- [ ] PHP 7.4+ installed
- [ ] MySQL 5.7+ atau MariaDB installed
- [ ] MySQL running dan accessible
- [ ] Node.js installed
- [ ] npm atau yarn installed

---

## 🐘 PHP API Setup

### Step 1: Database Setup

- [ ] Buka MySQL client: `mysql -u root -p`
- [ ] Run setup script: `mysql -u root -p < php-api/setup.sql`
- [ ] Verify database created:
  ```sql
  SHOW DATABASES;
  USE webdev_academy;
  SHOW TABLES;
  SELECT * FROM users;
  ```

### Step 2: Konfigurasi PHP

- [ ] Edit `php-api/config/database.php`:
  - [ ] Set `DB_HOST` (default: localhost)
  - [ ] Set `DB_USER` (default: root)
  - [ ] Set `DB_PASSWORD` (default: empty)
  - [ ] Set `DB_NAME` (default: webdev_academy)
  - [ ] Set `DB_PORT` (default: 3306)

### Step 3: Update Secret Key

- [ ] Edit `php-api/config/helpers.php`
- [ ] Change `$secretKey` untuk production:
  ```php
  $secretKey = 'your-super-secret-key-change-this-in-production';
  ```

### Step 4: Run PHP Server

- [ ] Open terminal di folder project
- [ ] Run: `cd php-api && php -S localhost:8000`
- [ ] Verify: Open http://localhost:8000/api/login.php di browser
- [ ] Should see JSON response (not HTML error)

---

## ⚛️ React Frontend Setup

### Step 1: Install Dependencies

- [ ] Run: `npm install` (atau `yarn install`)
- [ ] Verify: Check `node_modules` folder created

### Step 2: Update API Endpoints

- [ ] Edit `src/api.js`
- [ ] Verify `API_BASE_URL = 'http://localhost:8000'`
- [ ] Check CORS settings di `php-api/config/helpers.php`

### Step 3: Integrate AuthComponent

- [ ] Option A: Copy `src/AuthComponent_PHP.jsx` ke `src/AuthComponent.jsx`
- [ ] Option B: Atau update existing `AuthComponent.jsx` dengan import API

### Step 4: Run React Server

- [ ] Open new terminal
- [ ] Run: `npm run dev`
- [ ] Verify: Open http://localhost:5173 di browser

---

## 🧪 Integration Testing

### Test 1: Database Connection

- [ ] PHP server running
- [ ] Check file `php-api/config/database.php`
- [ ] PHP tidak return error 500

### Test 2: API Health Check

- [ ] Open http://localhost:8000/api/login.php
- [ ] Should return JSON:
  ```json
  {
    "success": false,
    "message": "Email dan password harus diisi"
  }
  ```

### Test 3: Register New User

- [ ] Frontend running di http://localhost:5173
- [ ] Go to Auth page
- [ ] Click "Daftar"
- [ ] Fill form:
  - [ ] Nama: Test User
  - [ ] Email: test@example.com
  - [ ] Password: password123
  - [ ] Konfirmasi: password123
- [ ] Click "Daftar"
- [ ] Expected: Redirect ke dashboard

**Debug (jika gagal):**

```javascript
// Di browser console:
localStorage.getItem("token"); // Should not be empty
localStorage.getItem("user"); // Should have user data
```

### Test 4: Login with New User

- [ ] Go back to Auth page
- [ ] Click "Login"
- [ ] Fill form:
  - [ ] Email: test@example.com
  - [ ] Password: password123
- [ ] Click "Login"
- [ ] Expected: Redirect ke dashboard

### Test 5: Verify Token

- [ ] Logged in state
- [ ] Open DevTools Console
- [ ] Run:
  ```javascript
  const session = localStorage.getItem("token");
  console.log(session);
  ```
- [ ] Token should exist (long encoded string)

### Test 6: Session Persistence

- [ ] Logged in
- [ ] Refresh page (F5)
- [ ] Expected: Still logged in, tidak kembali ke login page

---

## 🔐 Security Verification

- [ ] Password hashed dengan bcrypt ✅ (PHP)
- [ ] Token generated correctly ✅ (JWT)
- [ ] CORS headers set properly ✅
- [ ] Email validation working ✅
- [ ] Error messages don't leak info ✅

---

## 📊 Database Verification

### Check Users Table

```sql
SELECT * FROM users;
```

Expected output:

```
id | email           | full_name  | created_at
1  | john@example.com| John Doe   | 2024-12-04 10:30:00
2  | test@example.com| Test User  | 2024-12-04 10:35:00
```

### Check Activity Logs

```sql
SELECT * FROM activity_logs;
```

Expected: Login dan register activities logged

### Check Enrollments (if user enrolled in course)

```sql
SELECT * FROM enrollments WHERE user_id = 1;
```

---

## 🚨 Common Issues & Solutions

### Issue: "Database connection failed"

```
Solution:
1. Check MySQL running: mysql -u root
2. Verify DB_USER, DB_PASSWORD di php-api/config/database.php
3. Run setup.sql: mysql -u root -p < php-api/setup.sql
```

### Issue: CORS Error

```
Solution:
1. Check php-api/config/helpers.php
2. Verify Access-Control-Allow-Origin header
3. Restart PHP server
```

### Issue: Token Invalid

```
Solution:
1. Clear localStorage: localStorage.clear()
2. Login again
3. Check secret key di helpers.php
```

### Issue: Email Already Registered

```
Solution:
1. Use different email
2. Or delete from DB: DELETE FROM users WHERE email='test@example.com';
```

---

## 📁 Files Created

```
✅ php-api/
   ✅ config/database.php          - MySQL config
   ✅ config/helpers.php           - JWT & helpers
   ✅ api/login.php                - Login endpoint
   ✅ api/register.php             - Register endpoint
   ✅ api/verify-token.php         - Token verify
   ✅ setup.sql                    - DB schema
   ✅ README.md                    - PHP API docs

✅ src/
   ✅ api.js                       - React API client
   ✅ AuthComponent_PHP.jsx        - New auth component
   ✅ (modified) AuthComponent.jsx - If integrated

✅ Documentation:
   ✅ PHP_REACT_INTEGRATION.md     - Integration guide
   ✅ SETUP_CHECKLIST.md           - This file
```

---

## 🎯 Next Steps After Setup

1. **Database Connected?** → Continue
2. **API Working?** → Continue
3. **Login/Register tested?** → Continue
4. **Add more features:**
   - [ ] Courses API endpoints
   - [ ] Lesson progress tracking
   - [ ] User profile update
   - [ ] Password reset
   - [ ] Email verification
   - [ ] Admin dashboard

---

## 🆘 Help & Support

**Error Messages:**

- Check `php-api/README.md` for API docs
- Check `PHP_REACT_INTEGRATION.md` for integration guide
- Browser console for JavaScript errors
- `php-api/config/helpers.php` for response formatting

**Quick Commands:**

```bash
# Test PHP API
curl -X POST http://localhost:8000/api/register.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123","fullName":"Test"}'

# Test MySQL connection
mysql -u root -p -e "SELECT 1;"

# View PHP logs
tail -f /var/log/php*.log

# Restart PHP server
# Just stop (Ctrl+C) and re-run: php -S localhost:8000
```

---

## ✅ Sign Off

When all checks passed:

- [ ] Database: ✅
- [ ] PHP API: ✅
- [ ] React Frontend: ✅
- [ ] Login: ✅
- [ ] Register: ✅
- [ ] Session Persistence: ✅

**Status:** ✅ READY FOR PRODUCTION TESTING

---

**Last Updated:** December 4, 2025
**Version:** 1.0.0
**Status:** Complete Setup Guide
