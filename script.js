document.addEventListener('DOMContentLoaded', function() {
    // FAQ аккордеон
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
    button.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    const icon = this.querySelector('i');
    const isOpen = answer.classList.contains('active');
    // Закрываем все ответы
    document.querySelectorAll('.faq-answer').forEach(a => {
    a.style.maxHeight = null;
    a.classList.remove('active');
    a.classList.add('hidden');
    });
    document.querySelectorAll('.faq-button i').forEach(i => {
    i.style.transform = 'rotate(0deg)';
    });
    // Открываем/закрываем текущий ответ
    if (!isOpen) {
    answer.classList.remove('hidden');
    answer.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.style.transform = 'rotate(45deg)';
    }
    });
    });
    // Мобильное меню
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    });
    // Закрытие мобильного меню при клике на пункт
    const mobileMenuItems = mobileMenu.querySelectorAll('a');
    mobileMenuItems.forEach(item => {
    item.addEventListener('click', function() {
    mobileMenu.classList.add('hidden');
    });
    });
    // Кнопка наверх
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
    scrollTopBtn.classList.remove('opacity-0', 'invisible');
    scrollTopBtn.classList.add('opacity-100', 'visible');
    } else {
    scrollTopBtn.classList.add('opacity-0', 'invisible');
    scrollTopBtn.classList.remove('opacity-100', 'visible');
    }
    });
    scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
    });
    // Модальное окно поддержки
    const supportBtn = document.getElementById('supportBtn');
    const supportModal = document.getElementById('supportModal');
    const closeSupportModal = document.getElementById('closeSupportModal');
    supportBtn.addEventListener('click', function() {
    supportModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    });
    closeSupportModal.addEventListener('click', function() {
    supportModal.classList.remove('active');
    document.body.style.overflow = '';
    });
    // Модальное окно благодарности
    const thanksModal = document.getElementById('thanksModal');
    const closeThanksModalButtons = document.querySelectorAll('.closeThanksModal');
    closeThanksModalButtons.forEach(button => {
    button.addEventListener('click', function() {
    thanksModal.classList.remove('active');
    document.body.style.overflow = '';
    });
    });
    // Модальное окно ошибки
    const errorModal = document.getElementById('errorModal');
    const closeErrorModalButtons = document.querySelectorAll('.closeErrorModal');
    closeErrorModalButtons.forEach(button => {
    button.addEventListener('click', function() {
    errorModal.classList.remove('active');
    document.body.style.overflow = '';
    });
    });
    // Закрытие модальных окон при клике вне их области
    window.addEventListener('click', function(event) {
    if (event.target === supportModal) {
    supportModal.classList.remove('active');
    document.body.style.overflow = '';
    }
    if (event.target === thanksModal) {
    thanksModal.classList.remove('active');
    document.body.style.overflow = '';
    }
    if (event.target === errorModal) {
    errorModal.classList.remove('active');
    document.body.style.overflow = '';
    }
    });
    // Установка выбранного продукта в форме заказа
    const productButtons = document.querySelectorAll('[data-product]');
    const productSelect = document.getElementById('product');
    productButtons.forEach(button => {
    button.addEventListener('click', function() {
    const productName = this.getAttribute('data-product');
    for (let i = 0; i < productSelect.options.length; i++) {
    if (productSelect.options[i].value === productName) {
    productSelect.selectedIndex = i;
    break;
    }
    }
    });
    });
    // Отправка формы заказа
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const agreementCheckbox = this.querySelector('input[name="agreement"]');
    if (!agreementCheckbox.checked) {
    document.getElementById('errorMessage').textContent = 'Пожалуйста, подтвердите согласие на обработку персональных данных.';
    errorModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    return;
    }
    // Сбор данных формы
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
    formObject[key] = value;
    });
    // Отправка данных в Telegram
    sendToTelegram('Заказ турника', formObject, 'green');
    // Сброс формы и показ сообщения об успехе
    this.reset();
    thanksModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    });
    // Отправка формы поддержки
    const supportForm = document.getElementById('supportForm');
    supportForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const agreementCheckbox = this.querySelector('input[name="supportAgreement"]');
    if (!agreementCheckbox.checked) {
    document.getElementById('errorMessage').textContent = 'Пожалуйста, подтвердите согласие на обработку персональных данных.';
    errorModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    return;
    }
    // Сбор данных формы
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
    formObject[key] = value;
    });
    // Отправка данных в Telegram
    sendToTelegram('Запрос поддержки', formObject, 'blue');
    // Сброс формы и закрытие модального окна
    this.reset();
    supportModal.classList.remove('active');
    thanksModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    });
    // Обработка кнопок покупки
    const buyButtons = document.querySelectorAll('.buy-button');
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentModalButtons = document.querySelectorAll('.closePaymentModal');
    const paymentForm = document.getElementById('paymentForm');
    buyButtons.forEach(button => {
    button.addEventListener('click', function() {
    const productName = this.getAttribute('data-product');
    const productPrice = this.getAttribute('data-price');
    document.getElementById('paymentProductName').textContent = productName;
    document.getElementById('paymentAmount').textContent = productPrice;
    paymentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    });
    });
    closePaymentModalButtons.forEach(button => {
    button.addEventListener('click', function() {
    paymentModal.classList.remove('active');
    document.body.style.overflow = '';
    paymentForm.reset();
    });
    });
    // Маска для номера карты
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
    formattedValue += ' ';
    }
    formattedValue += value[i];
    }
    this.value = formattedValue;
    });
    // Маска для срока действия карты
    const expiryDateInput = document.getElementById('expiryDate');
    expiryDateInput.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    let formattedValue = '';
    if (value.length > 0) {
    formattedValue = value.substring(0, 2);
    if (value.length > 2) {
    formattedValue += '/' + value.substring(2, 4);
    }
    }
    this.value = formattedValue;
    });
    // Обработка формы оплаты
    paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const agreementCheckbox = this.querySelector('input[name="paymentAgreement"]');
    if (!agreementCheckbox.checked) {
    document.getElementById('errorMessage').textContent = 'Пожалуйста, подтвердите согласие с условиями оплаты.';
    errorModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    return;
    }
    
    // Сбор данных формы
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
    formObject[key] = value;
    });
    
    // Добавляем информацию о продукте и цене
    formObject.product = document.getElementById('paymentProductName').textContent;
    formObject.price = document.getElementById('paymentAmount').textContent;
    
    // Отправка данных в Telegram
    const BOT_TOKEN = '6731114231:AAGzev_SCeljR5txCCCJPxYRJC4XFgk71_8';
    const CHAT_ID = '791374398';
    
    let message = `<b>Оплата заказа</b>\n\n`;
    message += `<b>Товар:</b> ${formObject.product}\n`;
    message += `<b>Сумма:</b> ${formObject.price} ₽\n`;
    message += `<b>Имя:</b> ${formObject.name}\n`;
    message += `<b>Телефон:</b> ${formObject.phone}\n`;
    message += `<b>Email:</b> ${formObject.email}\n`;
    message += `<b>Адрес:</b> ${formObject.address}\n`;
    
    // Создаем и отправляем форму ЮMoney
    const yooMoneyForm = document.createElement('form');
    yooMoneyForm.method = 'POST';
    yooMoneyForm.action = 'https://yoomoney.ru/quickpay/confirm.xml';
    
    const formFields = {
    'receiver': '410019178238860',
    'formcomment': 'Оплата заказа',
    'short-dest': 'Оплата заказа',
    'label': 'order' + Date.now(), // Генерируем уникальный ID заказа
    'quickpay-form': 'shop',
    'targets': `Оплата товара: ${formObject.product}`,
    'sum': formObject.price,
    'paymentType': 'AC'
    };
    
    for (const [key, value] of Object.entries(formFields)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    yooMoneyForm.appendChild(input);
    }
    
    // Добавляем кнопку оплаты
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'ОПЛАТИТЬ';
    submitButton.className = 'w-full bg-primary text-white py-3 !rounded-button font-medium hover:bg-opacity-90 transition-all whitespace-nowrap';
    yooMoneyForm.appendChild(submitButton);
    
    // Добавляем обработчик отправки формы
    yooMoneyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Отправляем данные в Telegram
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
    if (xhr.status === 200) {
    console.log('Данные успешно отправлены в Telegram');
    // После успешной отправки в Telegram, отправляем форму ЮMoney
    yooMoneyForm.submit();
    } else {
    console.error('Ошибка отправки в Telegram:', xhr.statusText);
    }
    };
    
    xhr.onerror = function() {
    console.error('Ошибка отправки в Telegram');
    };
    
    xhr.send(JSON.stringify({
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'HTML'
    }));
    });
    
    // Добавляем форму на страницу
    document.body.appendChild(yooMoneyForm);
    
    // Сбрасываем форму и закрываем модальное окно
    this.reset();
    paymentModal.classList.remove('active');
    });
    // Функция отправки данных в Telegram
    function sendToTelegram(formName, formData, color) {
    const BOT_TOKEN = '6731114231:AAGzev_SCeljR5txCCCJPxYRJC4XFgk71_8';
    const CHAT_ID = '791374398';
    let message = `<b>${formName}</b>\n\n`;
    for (const [key, value] of Object.entries(formData)) {
    if (key !== 'supportAgreement' && key !== 'agreement') {
    let fieldName = key;
    switch(key) {
    case 'name': fieldName = 'Имя'; break;
    case 'phone': fieldName = 'Телефон'; break;
    case 'email': fieldName = 'Email'; break;
    case 'address': fieldName = 'Адрес'; break;
    case 'comment': fieldName = 'Комментарий'; break;
    case 'product': fieldName = 'Продукт'; break;
    case 'message': fieldName = 'Сообщение'; break;
    }
    message += `<b>${fieldName}:</b> ${value}\n`;
    }
    }
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const params = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'HTML'
    };
    fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
    })
    .catch(error => {
    console.error('Ошибка отправки в Telegram:', error);
    });
    }
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
    const headerHeight = document.querySelector('nav').offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
    });
    }
    });
    });
    // Маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    let formattedValue = '';
    if (value.length > 0) {
    formattedValue = '+';
    if (value.length > 0) {
    formattedValue += value.substring(0, 1);
    }
    if (value.length > 1) {
    formattedValue += ' (' + value.substring(1, 4);
    }
    if (value.length > 4) {
    formattedValue += ') ' + value.substring(4, 7);
    }
    if (value.length > 7) {
    formattedValue += '-' + value.substring(7, 9);
    }
    if (value.length > 9) {
    formattedValue += '-' + value.substring(9, 11);
    }
    }
    this.value = formattedValue;
    });
    });
    });