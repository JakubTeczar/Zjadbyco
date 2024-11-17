# Zjadbyco

**Frontend**
- `npm i`
- `npm start`

**Backend**
- `mvn clean install`
- `mvn spring-boot:run`


![ZJADBYCO](https://github.com/JakubTeczar/Zjadbyco/assets/106376926/49decfe5-b1b0-4976-a444-9c1783d194bf)
https://jakubteczar.github.io/site/#/zjadbyco/pl


- **AddElementToCal.js** –  Umożliwia dodawanie produktów lub dań do kalendarza na podstawie wybranej daty, z funkcjami walidacji formularza, zmiany ilości i kalorii, oraz przełączania między trybem dodawania produktów a dań, z obsługą wysyłania danych na serwer
- **AddElementToFridge.js** – Dodaje nowy produkt do lodówki użytkownika z podobnymi funkcjami co **AddElementToCal.js**
- **Calendar.js** –  Odpowiada za wyświetlanie kalendarza użytkownika z dodanymi elementami (np. produktami lub daniami) na wybrany dzień, oblicza łączną liczbę kalorii i umożliwia dodanie nowego elementu do kalendarza
- **ErrorPage.js** – Strona wyświetlająca błąd.
- **Fridge.js** – Wyświetla zawartość lodówki i umożliwia zarządzanie produktami.
- **GenerateEl.js** – Umożliwia użytkownikowi wprowadzenie danych dotyczących kalorii na dzień, liczby dni do przodu oraz wyboru, czy posiłki mają być generowane tylko z dostępnych produktów w lodówce, a także wyświetla informację o automatycznym tworzeniu listy zakupów.
- **Root.js** – Główny plik wejściowy aplikacji, zarządza strukturą.
- **Shopping.js** – Pozwala użytkownikowi na wygenerowanie listy zakupów na podstawie wybranego zakresu da

- **Settings**
    - **AddNewElements.js** – Dodaje nowe elementy do systemu, np. produkty czy danie.
    - **AddProductsToDish.js** – Dodaje składniki do wybranego dania.
    - **LoadPoolSettings.js** – Ładuje ustawienia aplikacji.
    - **Settings.js** – Umożliwia użytkownikowi dostosowanie ustawień aplikacji ilości kcal na dzien oraz puli Dań oraz produktów

- Hello
    - **ChooseElements.js** – Pozwala użytkownikowi wybrać elementy do dalszego przetwarzania.
    - **LastConfiguration.js** – Wyświetla ostatnią konfigurację użytkownika.
    - **Hello.js** – Strona powitalna użytkownika w aplikacji.

- Authentication
    - **RegistrationForm.js** – Formularz rejestracji nowego użytkownika.
    - **LoginForm.js** – Formularz logowania do aplikacji.
    - **AuthPage.js** – Strona obsługująca proces autentykacji użytkownika.

- **Components**
    - **DateNavigation.js** – Umożliwia nawigację po datach, umożliwiając wybór dnia
    - **Hamburger.js** – Przycisk hamburgera, obsługujący menu nawigacyjne.
    - **ListElement.js** –  Wyświetla pojedynczy element listy z możliwością zaznaczenia go, usunięcia, pokazania dodatkowych informacji o liście, oraz wyświetlania danych takich jak kalorie lub data
    - **ListElementToFridge.js** – Dodaje wybrane elementy z listy zakupów do zawartości lodówki.
    - **LoudList.js** – Tworzy i wyświetla pełną listę zakupów na podstawie danych użytkownika.
    - **Navigation.js** – Obsługuje nawigację w aplikacji, umożliwiając przechodzenie między sekcjami.
    - **NewElement.js** – Umożliwia dodawanie nowych elementów.
    - **loadYourPool.js** – Ładuje dane o produktach lub daniach z serwera w zależności od typu (produkt lub danie)
    - **selectField -** Umożliwia wybór, wyszukiwanie, aktualizowanie oraz usuwanie elementów z listy (np. produktów) w aplikacji, z możliwością dostosowania funkcji w zależności od trybu
