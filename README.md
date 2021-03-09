Better Software Group - zadanie rekrutacyjne

Zastosowane technologie, narzędzia i biblioteki:
 - React
 - React Hooks
 - React Router
 - React Player (https://github.com/CookPete/react-player)
 - Materialize.css (https://materializecss.com/)
 - Loading.io (https://loading.io/)

Sama aplikacja składa się z 4 osobnych komponentów oraz 4 różnych wyświetlanych stron w zależności od ścieżki:
 - "/" - Strona logowania oraz splash screen
 - "/home" - Strona główna z listami dostępnych filmów
 - "/player/:id" - Strona z dynamicznym ID, która wyświetla informacje o filmie + player (z powodu błędu 403 na endpointcie nie wyświetla odpowiednich filmów, jedynie placeholder)
 - Ostatnia to custom 404, gdy scieżka jest nieprawidłowa, działa dla każdej błędnej ścieżki oprócz "/player/:id", gdyż z braku dostępu do endpointu, nie mogłem przeprowadzić walidacji, czy przesłane ID do filmu jest poprawne.

Jeżeli chodzi o walidację, oprócz dodatkowego komponentu dla stron 404, wbudowałem małe zabezpieczenie w przypadku próby przejścia do podstron, bez wcześniejszego zalogowania się. Gdy token autoryzacyjny nie został zapisany, strona automatycznie przerzuca użytkownika do strony logowania. Tak samo w przypadku wygaśnięcia tokenu, gdy użytkownik spróbuje wysłać zapytanie do wyświetlenia listy. Dodatkowa walidacja powinna zostac dodana do formy logowania, aby nie przesyłać pustych danych, aczkolwiek testowe dane do logowania są pustym String, stąd musiałem z tego zrezygnować.

Do wyświetlenia listy z filmami zastosowałem karty z Materialize. Po kliknięciu na zdjęcie/tytuł/ikonę, rozsunie się ukryty element z opisem filmu (jeżeli opis filmu nie istnieje, nic się nie stanie), a po kliknieciu przycisku aby przejść do filmu, przeniesie użytkownika do strony z playerem.

W kwestii listy z filmami, maksymalna ilość filmów wyświetlonych za jednym razem to 10. Gdy liczba ta zostanie przekroczona, na dole strony pojawi się opcja przejścia do kolejnych stron w obrębie tej samej listy.

Kwestię responsywności na różnych wielkościach ekranu oraz na urządzeniach mobilnych, testowałem za pomocą Chrome i wbudowaną w nią możliwość przełączenia widoku na różne urządzenia mobilne.

W folderze extraStyles, znajdują się dodatkowe style, które nadpisują bazowe ustawienia w Materialize.css.

To raczej wszystko, jeżeli chodzi o dokumentację aplikacji. Udanego sprawdzania i miłego dnia :)