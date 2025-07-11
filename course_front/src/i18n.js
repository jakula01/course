import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      logout: "Logout",
      myAccount: "My profile",

      myTemplates: "My templates",
      create: "Create",
      refresh: "Refresh",
      noTemplates: "No templates yet.",

      myFilled: "My filled forms",
      noFilled: "No filled forms yet",

      numeric: "Numeric questions",
      checkbox: "Checkbox-questions",
      single: "Single-line questions",
      multi: "Multi-line questions",
      createdBy: "Created by",
      logining: "Login",
      registration: "Registration",
      register: "Register",
      dontHave: "Don't have an account?",
      alrHave: "Already have an account?",
      password: "Password",
      confirm: "Confirm password",
      email: "E-mail",
      username: "Username",
      dontmatch: "Passwords do not match",
      title: "Template title",
      description: "Description",
      save: "Save",
      question: "Question",
      failF: "Failed to load the forms",

      loading: "Loading...",
      answer: "Answer",
      submit: "Submit",
      comments: "Comments",
      noCom: "No comments yet",
      allTemplates: "All templates",
      noImg: "No image",
      lessMinAgo: "<1 min ago",
      mAgo: "mins ago",
      hAgo: "hours ago",
      dAgo: "days ago",
      filled: "Form filled by me",
      answerFrom: "Answer from user ",
      close: "Close",
      commentPlaceholder: "Your comment",
      leaveFeedback: "Leave Feedback",
      failT: "Error",
      viewTemplate: "View template page",
      areYouSureDelete: "Are you sure?",
      templSearch: "Search by template",
      mailConfirmed: "Email confirmed!",
      roleUser: "User",
      roleAdmin: "Admin",
      createdAt: "Registration date",
      block: "Block",
      filter: "Filter",
      administration: "Administration",
    },
  },
  ru: {
    translation: {
      login: "Вход",
      logout: "Выход",
      myAccount: "Личный кабинет",

      myTemplates: "Мои шаблоны",
      create: "Создать",
      refresh: "Обновить",
      noTemplates: "Шаблоны отсутствуют",

      myFilled: "Мои формы",
      noFilled: "Вы еще не заполняли формы",

      numeric: "Числовые вопросы",
      checkbox: "Чекбокс-вопросы",
      single: "Однострочные вопросы",
      multi: "Многострочные вопосы",
      createdBy: "Автор",
      logining: "Войти",
      registration: "Регистрация",
      register: "Зарегестрироваться",
      dontHave: "У вас нет аккаунта?",
      alrHave: "У вас уже есть аккаунт?",
      password: "Пароль",
      confirm: "Подтвердите пароль",
      email: "Почта",
      username: "Имя профиля",
      dontmatch: "Пароли не совпадают",
      title: "Название шаблона",
      description: "Описание",
      save: "Сохранить",
      question: "Вопрос",
      failF: "Не удалось загрузить формы",
      failT: "Ошибка",
      loading: "Загрузка...",
      answer: "Ответ",
      submit: "Отправить",
      comments: "Комментарии",
      noCom: "Коментарии отсутствуют",
      allTemplates: "Все шаблоны",
      noImg: "Нет изображения",
      lessMinAgo: "<1 мин назад",
      mAgo: "минут назад",
      hAgo: "часов назад",
      dAgo: "дней назад",
      filled: "Формы заполненные мной",
      answerFrom: "Ответ от пользователя ",
      close: "Закрыть",
      commentPlaceholder: "Коментарий",
      leaveFeedback: "Оставьте отзыв",
      viewTemplate: "Перейти на страницу шаблона",
      areYouSureDelete: "Вы уверены?",
      templSearch: "Поиск по шаблонам",
      mailConfirmed: "Email подтверждён!",
      roleUser: "Пользователь",
      roleAdmin: "Администратор",
      createdAt: "Дата регистрации",
      block: "Заблокировать",
      filter: "Фильтр",
      administration: "Администрация",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export default i18n;
