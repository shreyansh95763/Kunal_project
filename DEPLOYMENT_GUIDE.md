# Deployment Guide for Hostinger

Your Next.js project has been successfully built for static hosting. The static files are located in the [out/](file:///c:/Users/Lenovo/Documents/Kunal/out) directory, and a ready-to-upload archive has been created at [out.zip](file:///c:/Users/Lenovo/Documents/Kunal/out.zip) (~9.9 MB).

Follow the steps below to deploy your website to Hostinger.

---

## 📋 Step 1: Upload to Hostinger

Since you are using Hostinger Shared Hosting (which runs Apache/LiteSpeed web servers), uploading static HTML/CSS/JS is the easiest and most cost-effective way to host.

1. **Log in** to your [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Navigate to **Websites** and click **Manage** next to your domain.
3. Open the **File Manager** (under the *Files* section).
4. Navigate into the **`public_html`** folder (this is the root directory of your website).
5. Delete any default placeholder files (e.g., `default.php` or `index.php` created by Hostinger) if present.
6. Upload the **`out.zip`** file directly to the `public_html` folder.
7. Right-click `out.zip` inside the File Manager and choose **Extract**. Extract the files directly to the root of `public_html`.
8. Once extracted, you can delete the `out.zip` file to keep your server clean.

---

## 🔧 Step 2: URL Rewriting & Clean URLs (Included)

We have already configured an `.htaccess` file inside your [public/](file:///c:/Users/Lenovo/Documents/Kunal/public) directory, which compiles into your build folder. 

This file handles:
- Automatically redirecting HTTP requests to HTTPS.
- Serving pages (like `/blogs` or `/contact`) without showing the `.html` extension in the address bar.
- Handling 404 pages gracefully using `404.html`.
- Rewriting legacy page names (e.g., `Testing_and_Certification.html` redirects to clean `/testing-and-certification`).

*No actions are required here; the `.htaccess` file was already bundled inside `out.zip`.*

---

## ⚠️ Important Note: Form Submissions & API Routes

Since this is a static build (`output: 'export'`), the Node.js API endpoints (`/api/contact` and `/api/newsletter`) **will not execute on Hostinger Shared Hosting** because shared hosting does not run a persistent Node.js server.

To make your contact forms work on Hostinger Shared Hosting, you have two options:

### Option A: Use a Free Form Service (Easiest)
You can modify the form in [ContactForm.tsx](file:///c:/Users/Lenovo/Documents/Kunal/components/ContactForm.tsx) to send data to a free third-party form handler like **Web3Forms**, **Formspree**, or **Formkeep**.
For example, with Web3Forms:
1. Get a free Access Key from [Web3Forms](https://web3forms.com/).
2. Change the fetch URL in `ContactForm.tsx` from `/api/contact` to `https://api.web3forms.com/submit` and append your access key to the form data.

### Option B: Replace Next.js API Routes with a PHP script (Hostinger-native)
Since Hostinger supports PHP out of the box, you can create a simple `contact-mail.php` in your `public/` directory (so it is copied to the root of the site) and change your frontend `fetch("/api/contact")` call to `fetch("/contact-mail.php")`.

Here is a simple example of a PHP mailer script you could name `public/contact-mail.php`:
```php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"] ?? "";
    $email = $_POST["email"] ?? "";
    $phone = $_POST["phone"] ?? "";
    $query = $_POST["query"] ?? "";

    if (empty($name) || empty($email) || empty($query)) {
        echo json_encode(["status" => "error", "message" => "Please fill in all required fields."]);
        exit;
    }

    $to = "your-email@ggdl.com"; // Replace with your actual email address
    $subject = "New Website Enquiry from $name";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nQuery:\n$query";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Thank you - your enquiry has been received."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send email. Please try again later."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
```
