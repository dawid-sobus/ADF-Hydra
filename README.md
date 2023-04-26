# ADF-Hydra

Ogólny opis aplikacji

Użytkownicy wyrażający chęć korzystania z aplikacji, mają możliwość  zarejestrowania się do niej oraz zalogowania (np. monterzy prowadzący jednoosobową działalność gospodarczą).

- Zakładka „Klienci”

Aplikacja ta zawiera bazę klientów, gdzie znajdują się ich dane takie jak: imię, nazwisko, miejsce montażu, data montażu, data gwarancji, nr telefonu, adres, e-mail, data następnego przeglądu, zamontowane urządzenie/części i odliczanie czasu do kolejnego przeglądu. W ostatnim oknie jest miejsce na dodanie faktury jak i na protokoły pogwarancyjne PDF (co znacznie ułatwi pracę monterom urządzeń oraz zmniejszy ilość dokumentów, które muszą być przechowywane w formie papierowej). Te informacje są widoczne po wyszukaniu danego klienta, a protokoły PDF są wyświetlane po kliknięciu w link zawierający dokument. Jest również możliwość wyszukania klientów na podstawie imienia i nazwiska oraz miesiąca (np. jeśli wybierzemy styczeń - wyświetla wszystkich klientów, u których usługa świadczona była w styczniu). Aplikacja umożliwia też modyfikację danych klientów, w razie gdyby uległy one zmianie. Dane są zapisane w tabeli skróconej, tzn. na początku są widoczne podstawowe informacje takie jak: imię, nazwisko, adres, telefon, a po kliknięciu na daną osobę tabela się rozsuwa i pokazuje szczegółowe dane klienta już w dwóch kolumnach. W kolumnie po lewej stronie są podstawowe dane: adres, telefon itd., natomiast po prawej szczegółowe: nazwa wymienionej części, data pierwszego uruchomienia zamontowanego urządzenia, faktura, protokół PDF itd. Klienci są zapisywani chronologicznie według daty pierwszej usługi.

- Zakładka „Dodaj klienta”

Zakładka ta umożliwia dodanie klienta, pojawia się formularz, w którym zawarte zostaną pola do wprowadzenia danych nowego klienta takie jak powyżej. W tym formularzu trzeba od razu wpisać jaką czynność należy wykonać u danej osoby, datę oraz godzinę wykonania i w momencie uzupełnienia czynności i po zatwierdzeniu formularza klient zostanie dodany do listy klientów, a zadanie, które ma zostać wykonane u klienta przejdzie do zakładki serwis, gdzie będzie wyświetlało się wtedy, kiedy daną naprawę u klienta trzeba będzie wykonać.

- Zakładka „Serwis”

Poprzez wpisane dane klienta w zakładce „Dodaj klienta”, w zakładce „Serwis” są wyświetlane przypomnienia o serwisach gwarancyjnych urządzeń zamontowanych rok wcześniej oraz przypomnienia o skontaktowaniu się z klientem w dany dzień, aby przypomnieć o danym serwisie lub dopytać jak dane urządzenie działa. Opcja „zadzwoń” wyświetla się na czerwono. Przy przypomnieniach jest również opcja odznaczenia, że został wykonany telefon do danej osoby lub została wykonana usługa, oraz opcja dodania powiązanego zadania np. przeprowadzenie serwisu pieca za jakiś okres czasu, ponieważ w ramach gwarancji niektóre urządzenia muszą być serwisowane co roku, aby gwarancja ta nie przepadła. W przypomnieniach wyświetlają się również powiadomienia, 2 tygodnie do tyłu od dnia obecnego, aby można było podpiąć protokół PDF do osoby, u której był wykonywany serwis oraz uzupełnić inne brakujące dane. Tutaj również znajduje się tabela, lecz jako główne informacje podane są: czas do kolejnego serwisu (będzie zegar, który będzie odliczał, ile jeszcze czasu zostało, aby skontaktować się z klientem), telefon, imię, nazwisko. Kiedy klikniemy, tabela się rozsunie, po lewej stronie widoczne są podstawowe dane, po prawej szczegółowe. Następny termin wykonania zadania (jest brany pod uwagę dwa tygodnie przed wykonaniem tego serwisu). Na przykład po wykonaniu usługi, takiej jak wymiana pieca, jest możliwość dodania zadania powiązanego, czyli na przykład dodania zadania serwisu pieca za wybrany przez instalatora okres czasu w ramach gwarancji, aby przeprowadzić serwis tego pieca, ponieważ klienci często zapominają o corocznym serwisowaniu, przez co tracą gwarancję. Po wejściu w zakładkę „wypisz główne zadania” możemy zobaczyć jakie zadania były wykonywane na danym urządzeniu zakładając, że zadaniem głównym było np. montaż pieca, dzięki czemu możemy sprawdzić, kiedy był wykonywany serwis i czy gwarancja na piec nie wygasła. W zakładce „wypisz wszystkie zadania” można zobaczyć wszystkie zadania wykonane u wszystkich klientów i jakieś wyszukać. Dodany został również kalendarz, gdzie można zobaczyć, w którym dniu zostały wykonane jakie zadania.

- Zakładka „Strona główna”

Na stronie głównej wyświetlane są serwisy oraz naprawy, które są zapisane na obecny dzień, po kliknięciu na jeden z serwisów lub napraw będzie rozsuwał się pasek, na którym wyświetlą się szczegółowe dane zadania oraz klienta, u którego należy wykonać usługę.

- Uruchomienie aplikacji:
Należy pobrać i otworzyć aplikację, a następnie w terminalu wpisać polecenie:
node app.js
