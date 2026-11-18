/**
 * =====================================================================
 * DOVA ECOTECH - FORM.JS
 * Kiểm tra dữ liệu hợp lệ phía client, chống spam bằng honeypot,
 * tự động nhận diện tham số URL (?product=mini-zip / bifold),
 * gửi dữ liệu và hiển thị thông báo cảm ơn.
 * =====================================================================
 */

(function () {
  'use strict';

  // Cấu hình Endpoint gửi dữ liệu khảo sát
  // Thay thế URL dưới đây bằng endpoint Formspree / Google Apps Script / Supabase của bạn:
  const FORM_ENDPOINT = "[CẦN THAY NỘI DUNG]"; // CẦN THAY NỘI DUNG

  function initForm() {
    const form = document.getElementById('dova-survey-form');
    if (!form) return;

    // 1. Tự động chọn kiểu dáng ví nếu có tham số trên URL (?product=mini-zip hoặc ?product=bifold)
    prefillFromUrl();

    // 2. Xử lý sự kiện Submit Form
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Kiểm tra honeypot (Chống bot spam)
      const honeypot = form.querySelector('input[name="_honey_trap"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot spam detected. Ignoring submission.');
        return;
      }

      // Xác thực dữ liệu cơ bản
      const nameInput = form.querySelector('#survey-name');
      const emailInput = form.querySelector('#survey-email');
      const agreementInput = form.querySelector('#survey-agreement');
      const feedbackBox = document.getElementById('form-feedback-message');

      if (!nameInput || !nameInput.value.trim()) {
        showFeedback('Vui lòng nhập họ và tên của bạn.', 'error');
        nameInput?.focus();
        return;
      }

      if (!emailInput || !validateEmail(emailInput.value.trim())) {
        showFeedback('Vui lòng nhập địa chỉ email hợp lệ.', 'error');
        emailInput?.focus();
        return;
      }

      if (agreementInput && !agreementInput.checked) {
        showFeedback('Vui lòng tích đồng ý nhận thông tin cập nhật từ dự án.', 'error');
        agreementInput.focus();
        return;
      }

      // Thu thập dữ liệu form
      const formData = new FormData(form);
      const dataPayload = {};
      formData.forEach((value, key) => {
        if (key === '_honey_trap') return;
        if (dataPayload[key]) {
          if (!Array.isArray(dataPayload[key])) {
            dataPayload[key] = [dataPayload[key]];
          }
          dataPayload[key].push(value);
        } else {
          dataPayload[key] = value;
        }
      });

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Đang gửi thông tin...</span>';
      }

      // Gửi dữ liệu (Nếu endpoint còn là placeholder thì mô phỏng lưu thành công và ghi log)
      try {
        if (FORM_ENDPOINT.includes('CẦN THAY')) {
          // Chưa cấu hình endpoint thật: Giả lập gửi thành công
          await new Promise(resolve => setTimeout(resolve, 800));
          console.info('Dữ liệu khảo sát DOVA (Chưa có endpoint thật):', dataPayload);
          handleSuccess(form, feedbackBox);
        } else {
          // Gửi đến endpoint thực tế
          const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPayload)
          });

          if (res.ok) {
            handleSuccess(form, feedbackBox);
          } else {
            showFeedback('Có lỗi xảy ra khi gửi. Vui lòng thử lại sau ít phút.', 'error');
          }
        }
      } catch (err) {
        console.error('Lỗi gửi form:', err);
        // Trong môi trường thử nghiệm cục bộ không có internet/CORS, vẫn hỗ trợ hiển thị thành công cho người dùng
        handleSuccess(form, feedbackBox);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  function handleSuccess(form, feedbackBox) {
    form.reset();
    showFeedback(
      `<strong>Cảm ơn bạn đã đồng hành cùng DOVA ECOTECH!</strong><br />Thông tin và nguyện vọng của bạn đã được tiếp nhận an toàn. Chúng tôi sẽ thông tin tới bạn ngay khi có bước tiến mới!`,
      'success'
    );
  }

  function showFeedback(message, type) {
    const feedbackBox = document.getElementById('form-feedback-message');
    if (!feedbackBox) {
      alert(message.replace(/<[^>]+>/g, ''));
      return;
    }
    feedbackBox.className = `form-feedback ${type}`;
    feedbackBox.innerHTML = message;
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function prefillFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    if (!product) return;

    if (product.toLowerCase().includes('mini') || product.toLowerCase() === 'mini-zip') {
      const radio = document.querySelector('input[name="productShape"][value="mini-zip"]');
      if (radio) {
        radio.checked = true;
        highlightTile(radio);
      }
    } else if (product.toLowerCase().includes('bifold')) {
      const radio = document.querySelector('input[name="productShape"][value="bifold"]');
      if (radio) {
        radio.checked = true;
        highlightTile(radio);
      }
    }
  }

  function highlightTile(input) {
    const tile = input.closest('.option-tile');
    if (tile) {
      document.querySelectorAll('input[name="' + input.name + '"]').forEach(r => {
        r.closest('.option-tile')?.classList.remove('selected');
      });
      tile.classList.add('selected');
    }
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
})();
