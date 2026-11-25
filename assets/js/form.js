/**
 * =====================================================================
 * DOVA ECOTECH - FORM.JS
 * Xử lý gửi form đăng ký khảo sát nhu cầu tới Google Apps Script (Google Sheets).
 *
 * Các trường dữ liệu gửi đi (JSON payload):
 * - name: Họ và tên (string, bắt buộc)
 * - email: Địa chỉ email (string, bắt buộc)
 * - age: Nhóm độ tuổi (string, chữ hiển thị trên form)
 * - shape: Kiểu dáng ví quan tâm (string, chữ hiển thị trên form)
 * - version: Dòng phiên bản trải nghiệm (string, chữ hiển thị trên form)
 * - price: Mức giá mong muốn (string, chữ hiển thị trên form)
 * - features: Điều quan tâm nhất (mảng các chuỗi hiển thị trên form)
 * - channel: Kênh mua sắm hay dùng (string, chữ hiển thị trên form)
 * - phoneOs: Điện thoại đang sử dụng (string, chữ hiển thị trên form)
 * - feedback: Góp ý hoặc mong muốn bổ sung (string)
 * - consent: Đồng ý điều khoản nhận tin (string, chữ hiển thị trên form)
 * =====================================================================
 */

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxgle4V_wQgi3YCfbJBz29TGMqE-DBYSkraSApXR1J1GWpfeZDCNxEojRsQW-VgQ9SkNg/exec";

(function () {
  'use strict';

  function initForm() {
    const form = document.getElementById('dova-survey-form');
    if (!form) return;

    // 1. Đồng bộ trạng thái giao diện tile ban đầu & lắng nghe thay đổi
    syncOptionTiles(form);
    form.addEventListener('change', handleOptionTileChange);

    // 2. Tự động chọn kiểu dáng ví nếu có tham số trên URL (?product=mini-zip hoặc ?product=bifold)
    prefillFromUrl(form);

    // 3. Xử lý sự kiện Submit Form
    form.addEventListener('submit', async (e) => {
      // Chặn submit mặc định
      e.preventDefault();

      // Kiểm tra honeypot (Chống bot spam)
      const honeypot = form.querySelector('input[name="_honey_trap"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot spam detected. Ignoring submission.');
        return;
      }

      // Lấy các phần tử form
      const nameInput = form.querySelector('#survey-name') || form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('#survey-email') || form.querySelector('input[name="email"]');
      const feedbackInput = form.querySelector('#survey-feedback') || form.querySelector('textarea[name="feedback"]');
      const consentInput = form.querySelector('#survey-agreement') || form.querySelector('input[name="consent"]') || form.querySelector('input[name="agreement"]');
      const feedbackBox = document.getElementById('form-feedback-message');

      // Kiểm tra họ và tên hợp lệ (bắt buộc)
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        showFeedback('Vui lòng nhập họ và tên của bạn.', 'error');
        nameInput?.focus();
        return;
      }

      // Kiểm tra email hợp lệ (bắt buộc)
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal || !validateEmail(emailVal)) {
        showFeedback('Vui lòng nhập địa chỉ email hợp lệ.', 'error');
        emailInput?.focus();
        return;
      }

      // Kiểm tra consent (đồng ý nhận tin)
      if (consentInput && !consentInput.checked) {
        showFeedback('Vui lòng tích chọn đồng ý nhận thông tin cập nhật từ dự án để tiếp tục.', 'error');
        consentInput.focus();
        return;
      }

      // Lấy chữ hiển thị cho radio và checkbox (đảm bảo đúng giá trị hiển thị trên form)
      const ageVal = getRadioDisplayText(form, 'age', 'ageGroup');
      const shapeVal = getRadioDisplayText(form, 'shape', 'productShape');
      const versionVal = getRadioDisplayText(form, 'version', 'tierInterest');
      const priceVal = getRadioDisplayText(form, 'price', 'priceRange');
      const featuresVal = getCheckboxesDisplayText(form, 'features', 'keyInterests');
      const channelVal = getRadioDisplayText(form, 'channel', 'shoppingChannel');
      const phoneOsVal = getRadioDisplayText(form, 'phoneOs');
      const feedbackVal = feedbackInput ? feedbackInput.value.trim() : '';
      const consentVal = consentInput && consentInput.checked ? getDisplayText(consentInput) : '';

      // Đóng gói JSON payload có đúng các key theo yêu cầu:
      // name, email, age, shape, version, price, features (mảng), channel, phoneOs, feedback, consent
      const payload = {
        name: nameVal,
        email: emailVal,
        age: ageVal,
        shape: shapeVal,
        version: versionVal,
        price: priceVal,
        features: featuresVal,
        channel: channelVal,
        phoneOs: phoneOsVal,
        feedback: feedbackVal,
        consent: consentVal
      };

      // Khóa nút khi đang gửi
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.75';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.innerHTML = '<span>Đang gửi thông tin...</span>';
      }

      // Ẩn thông báo cũ trước khi gửi
      if (feedbackBox) {
        feedbackBox.style.display = 'none';
        feedbackBox.className = 'form-feedback';
        feedbackBox.innerHTML = '';
      }

      try {
        console.log('[DOVA Form] Bắt đầu gửi payload tới Google Apps Script:', payload);

        // Gửi dữ liệu bằng fetch POST với mode "no-cors", header Content-Type "text/plain"
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify(payload)
        });

        console.log('[DOVA Form] Gửi thành công tới Google Apps Script!');
        // Hiện thông báo cảm ơn khi xong
        handleSuccess(form, feedbackBox);
      } catch (err) {
        console.error('Lỗi khi gửi form tới Google Apps Script:', err);
        showFeedback('Có lỗi xảy ra khi gửi thông tin. Vui lòng kiểm tra kết nối mạng và thử lại.', 'error');
      } finally {
        // Mở khóa nút sau khi gửi xong
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
          submitBtn.style.cursor = '';
          submitBtn.innerHTML = originalBtnContent;
        }
      }
    });
  }

  /**
   * Lấy chữ hiển thị trên form của một input radio hoặc checkbox
   * Ví dụ: <span>Từ 26 đến 40 tuổi</span> -> "Từ 26 đến 40 tuổi"
   */
  function getDisplayText(input) {
    if (!input) return '';
    const label = input.closest('label');
    if (label) {
      const span = label.querySelector('span');
      if (span) {
        return span.textContent.trim().replace(/\s+/g, ' ');
      }
      const clone = label.cloneNode(true);
      const inputInClone = clone.querySelector('input');
      if (inputInClone) inputInClone.remove();
      const text = clone.textContent.trim().replace(/\s+/g, ' ');
      if (text) return text;
    }
    return input.value || '';
  }

  /**
   * Lấy chữ hiển thị của radio button đang được chọn
   */
  function getRadioDisplayText(form, ...names) {
    for (const name of names) {
      const checked = form.querySelector(`input[type="radio"][name="${name}"]:checked`);
      if (checked) {
        return getDisplayText(checked);
      }
    }
    return '';
  }

  /**
   * Lấy mảng chữ hiển thị của các checkbox đang được chọn
   */
  function getCheckboxesDisplayText(form, ...names) {
    const result = [];
    for (const name of names) {
      const checkedList = form.querySelectorAll(`input[type="checkbox"][name="${name}"]:checked`);
      checkedList.forEach((input) => {
        const text = getDisplayText(input);
        if (text) {
          result.push(text);
        }
      });
    }
    return result;
  }

  /**
   * Xử lý hiển thị thông báo cảm ơn khi gửi thành công
   */
  function handleSuccess(form, feedbackBox) {
    form.reset();
    syncOptionTiles(form);
    showFeedback(
      `<strong>Cảm ơn bạn đã đồng hành cùng DOVA ECOTECH!</strong><br />Thông tin và nguyện vọng của bạn đã được tiếp nhận an toàn. Chúng tôi sẽ cập nhật tới bạn ngay khi có bước tiến mới!`,
      'success'
    );
  }

  /**
   * Hiển thị thông báo phản hồi (thành công hoặc lỗi)
   */
  function showFeedback(message, type) {
    const feedbackBox = document.getElementById('form-feedback-message');
    if (!feedbackBox) {
      alert(message.replace(/<[^>]+>/g, ''));
      return;
    }
    feedbackBox.className = `form-feedback ${type}`;
    feedbackBox.style.display = 'block';
    feedbackBox.innerHTML = message;
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Kiểm tra định dạng email hợp lệ
   */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Đồng bộ class .selected cho các thẻ option-tile
   */
  function syncOptionTiles(form) {
    const tiles = form.querySelectorAll('.option-tile');
    tiles.forEach((tile) => {
      const input = tile.querySelector('input');
      if (input && (input.type === 'radio' || input.type === 'checkbox')) {
        tile.classList.toggle('selected', input.checked);
      }
    });
  }

  /**
   * Lắng nghe sự kiện click/thay đổi để cập nhật giao diện tile
   */
  function handleOptionTileChange(e) {
    const target = e.target;
    if (!target || !target.matches('input[type="radio"], input[type="checkbox"]')) return;
    const form = target.form;
    if (!form) return;

    if (target.type === 'radio') {
      const radios = form.querySelectorAll(`input[type="radio"][name="${target.name}"]`);
      radios.forEach((r) => {
        r.closest('.option-tile')?.classList.toggle('selected', r.checked);
      });
    } else if (target.type === 'checkbox') {
      target.closest('.option-tile')?.classList.toggle('selected', target.checked);
    }
  }

  /**
   * Tự động chọn kiểu dáng ví từ tham số URL (?product=mini-zip hoặc ?product=bifold)
   */
  function prefillFromUrl(form) {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    if (!product) return;

    const norm = product.toLowerCase();
    let targetRadio = null;

    if (norm.includes('mini') || norm === 'mini-zip') {
      targetRadio = form.querySelector('input[name="shape"][value="mini-zip"], input[name="productShape"][value="mini-zip"]');
    } else if (norm.includes('bifold')) {
      targetRadio = form.querySelector('input[name="shape"][value="bifold"], input[name="productShape"][value="bifold"]');
    }

    if (targetRadio) {
      targetRadio.checked = true;
      syncOptionTiles(form);
    }
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
})();
