// @ts-nocheck
import { ScrollView, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BottomBar from "../components/Layout/BottomBar";

const DetailsScreen = ({ navigation }) => {

    function goBack() {
        navigation.goBack()
    }

    const backButtonChar = "\u276e"

    return (
        <SafeAreaView style={{
            height: '100%',
            width: '100%',
            alignContent: "center"
        }}>
            {/*<View style={{
                marginBottom: "1%",
                width: "100%"
            }}>
                <TouchableOpacity style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignContent: "left",
                    justifyContent: "left"
                }}
                    onPress={goBack}>
                    <Text style={{
                        fontSize: 40,
                        color: "grey",
                        paddingLeft: "5%"
                    }}>{backButtonChar}</Text>
                </TouchableOpacity>
            </View>*/}
            <ScrollView>
                <View style={{
                    paddingHorizontal: "5%",
                    paddingTop: "5%",
                    paddingBottom: "10%"
                }}>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20
                        }}>
                            Allgemeine Geschäftsbedingungen
                        </Text>
                        <Text>Die Begriffe ("uns", "wir", "Unternehmen" oder "Finder") beziehen sich auf die Finder Group Mannheim.

                            1. Annahme des Vertrags über die Nutzungsbedingungen.
                            Durch das Erstellen eines Finder-Kontos, sei es mit einem Mobilgerät, einer mobilen Anwendung oder einem Computer (zusammenfassend der "Dienst" genannt) erklären Sie sich einverstanden, an (i) diese Nutzungsbedingungen, (ii) unsere Datenschutzrichtlinie, unsere Cookie-Richtlinie, unsere Schlichtungsverfahren (falls dies auf Sie zutrifft), an die Sicherheitstipps sowie die Community-Guidelines, wobei jeder Punkt durch Bezugnahme in diesem Vertrag aufgenommen ist, sowie an (iii) sämtliche Bedingungen, die von Ihnen offengelegt werden und denen Sie zugestimmt haben, wenn Sie zusätzliche Funktionen, Produkte oder Dienste erwerben, die wir im Rahmen des Dienstes anbieten (zusammenfassend dieser "Vertrag" genannt), gebunden zu sein. Wenn Sie nicht alle Bedingungen dieses Vertrags annehmen und sich mit diesen nicht einverstanden erklären, bitten wir Sie, den Dienst nicht zu nutzen.

                            Wir sind berechtigt, von Zeit zu Zeit Änderungen an diesem Vertrag und an dem Dienst vorzunehmen. Diese können wir aus verschiedenen Gründen vornehmen, z. B. um Gesetzesänderungen oder veränderte gesetzliche Anforderungen, neue Funktionen oder Änderungen von Geschäftspraktiken widerzuspiegeln. Die aktuellste Version dieses Vertrags wird im Rahmen des Dienstes in den Einstellungen und auf gofinder.com gepostet, und Sie sollten regelmäßig die aktuellste Version lesen. Die aktuellste Version ist immer die Version, die Gültigkeit hat. Wenn die Änderungen bedeutende Änderungen umfassen, die Ihre Rechte oder Pflichten betreffen, werden wir Sie spätestens 30 Tage im Voraus auf angemessene Weise über diese Änderungen informieren (es sei denn, wir sind dazu nach geltendem Recht nicht in der Lage), z. B. per Mitteilungen über den Dienst oder per E-Mail. Wenn Sie den Dienst weiterhin nutzen, nachdem die Änderungen wirksam werden, stimmen Sie dem überarbeiteten Vertrag zu.

                            2. Berechtigung.
                            Sie sind nicht berechtigt, ein Konto zu erstellen oder auf den Dienst oder die Systeme, auf denen es sich befindet, zuzugreifen oder es zu nutzen, wenn nicht alle der folgenden Punkte zutreffen:

                            Sie sind mindestens 18 Jahre alt.
                            Sie einen verbindlichen Vertrag mit Finder schließen können;
                            Sie nicht zu einem Personenkreis gehören, der von der Nutzung des Dienstes gemäß den Gesetzen der Vereinigten Staaten oder einer anderen geltenden Gerichtsbarkeit ausgeschlossen ist (zum Beispiel werden Sie nicht auf der Liste des US-amerikanischen Finanzministeriums für besonders gekennzeichnete Staatsangehörige (Specially Designated Nationals) geführt oder unterliegen einem anderen ähnlichen Verbot),
                            Sie diesen Vertrag und alle geltenden lokalen, staatlichen, nationalen und internationalen Gesetze, Regeln und Vorschriften einhalten werden; und
                            Sie zu keinem Zeitpunkt ein Schwerverbrechen oder eine Straftat (oder ein Verbrechen von ähnlichem Ausmaß), ein Sexualverbrechen oder eine Straftat mit Gewalt begangen haben, und dass Sie in keinem staatlichen, bundesstaatlichen oder lokalen Sexualstraftäterregister als Sexualstraftäter geführt werden.
                            3. Ihr Konto.
                            Um Finder zu verwenden, können Sie sich auf verschiedene Weisen anmelden, z. B. mit Ihrem Facebook-Login. Wenn Sie sich für eine Anmeldung mit Ihrem Facebook-Login entscheiden, berechtigen Sie uns in Bezug auf den Zugriff auf bzw. die Verwendung bestimmter Facebook-Konto-Informationen, einschließlich, aber nicht beschränkt auf Ihr öffentliches Facebook-Profil. Für weitere Informationen bezüglich der Informationen, die wir von Ihnen erheben, und über die Art und Weise, wie wir diese nutzen, ziehen Sie bitte unsere Datenschutzrichtlinie zu Rate.

                            Sie sind dafür verantwortlich, die Zugangsdaten, die Sie zur Anmeldung bei Finder verwenden, vertraulich zu behandeln, und tragen die alleinige Verantwortung für sämtliche Aktivitäten, die unter diesen Zugangsdaten auftreten. Wenn Sie denken, dass sich jemand Zugriff auf Ihr Konto verschafft hat, kontaktieren Sie uns bitte unverzüglich über unser Kontaktformular.

                            4. Änderung des Dienstes und Kündigung.
                            Finder ist stets bestrebt, den Dienst zu verbessern und Ihnen zusätzliche Funktionalitäten zur Verfügung zu stellen, die Sie als ansprechend und nützlich empfinden. Dies bedeutet, dass wir von Zeit zu Zeit neue Produktfunktionen oder -erweiterungen einbringen sowie einige Funktionen entfernen werden, und wenn diese Maßnahmen keine wesentliche Auswirkung auf Ihre Rechte oder Pflichten haben, dürfen wir diese durchführen, ohne Sie vorher darüber zu informieren. Wir können sogar den Dienst ganz aussetzen, wobei wir Sie in diesem Fall im Voraus benachrichtigen, sofern uns mildernde Umstände, wie etwa Sicherheitsbedenken, nicht daran hindern.

                            Sie können Ihr Konto jederzeit aus jeglichem Grund kündigen, indem Sie den Anweisungen unter "Einstellungen" im Dienst folgen. Allerdings müssen Sie, wenn Sie ein Drittanbieter-Zahlungskonto wie den App Store bzw. den iTunes Store von Apple ("App Store") oder den Google Play Store verwenden, Ihre In-App-Käufe über ebendieses Konto verwalten, um zusätzliche Abrechnungen zu vermeiden. Finder kann Ihr Konto jederzeit ohne Ankündigung kündigen, wenn wir der Ansicht sind, dass Sie gegen diesen Vertrag verstoßen haben. Nach einer solchen Kündigung haben Sie keinen Anspruch auf eine Rückerstattung.

                            Bewohner von Südkorea informieren wir unverzüglich über den Grund für die entsprechende Maßnahme, außer in dem Fall, in dem wir der Ansicht sind, dass (i) eine Bekanntgabe gesetzlich verboten ist (z. B. wenn eine Bekanntgabe gegen geltende Gesetze, Vorschriften oder Anordnungen der zuständigen Behörden verstößt oder eine laufende Ermittlung gefährdet, die von einer Aufsichtsbehörde durchgeführt wird) oder (ii) eine Bekanntgabe Ihnen, Dritten, Finder und/oder unseren Vertragspartnern Schaden zufügt (z. B. wenn eine Mitteilung die Sicherheit des Dienstes beeinträchtigt).

                            Wenn Ihr Konto gekündigt wurde, wird dieser Vertrag beendet, sofern nicht die folgenden Bestimmungen weiterhin für Sie und Finder gelten: Abschnitt 4, Abschnitt 5 und die Abschnitte 12 bis 19.

                            5. Sicherheit; Ihre Interaktionen mit anderen Mitgliedern.
                            Obwohl Finder bestrebt ist, eine respektvolle Nutzererfahrung durch Funktionen wie das Double-Opt-in, das die Kommunikation zwischen Mitgliedern erst dann erlaubt, wenn beide Interesse aneinander gezeigt haben, zu fördern, ist Finder nicht für das Verhalten von Mitgliedern innerhalb oder außerhalb des Dienstes verantwortlich. Sie erklären sich damit einverstanden, bei allen Interaktionen mit anderen Mitgliedern vorsichtig vorzugehen, insbesondere, wenn Sie sich dazu entschließen, außerhalb des Dienstes zu kommunizieren oder die Mitglieder persönlich zu treffen. Darüber hinaus erklären Sie sich damit einverstanden, die Sicherheitstipps von Finder zu lesen und zu befolgen, bevor Sie den Dienst nutzen. Sie stimmen zu, keine finanzrelevanten Informationen (z. B. Ihre Kreditkarten- oder Bankkontodaten) gegenüber anderen Mitgliedern preiszugeben bzw. kein Geld durch Überweisung oder anderweitig an diese zu versenden.

                            SIE SIND ALLEIN FÜR IHRE INTERAKTIONEN MIT ANDEREN MITGLIEDERN VERANTWORTLICH. SIE SIND SICH DARÜBER BEWUSST, DASS FINDER KEINE ÜBERPRÜFUNG DER KRIMINELLEN VERGANGENHEIT BEI SEINEN MITGLIEDERN VORNIMMT ODER SICH ANDERWEITIG ÜBER DIE VERGANGENHEIT UND HINTERGRÜNDE SEINER MITGLIEDER ERKUNDIGT. FINDER GIBT KEINE ZUSICHERUNGEN ODER GARANTIEN HINSICHTLICH DES VERHALTENS ODER DER VEREINBARKEIT DER MITGLIEDER.

                            6. Rechte, die Ihnen Finder gewährt.
                            Finder gewährt Ihnen eine persönliche, weltweite, gebührenfreie, nicht übertragbare, nicht ausschließliche, widerrufliche und nicht unterlizenzierbare Lizenz für den Zugriff auf den Dienst sowie für dessen Nutzung. Diese Lizenz ist für den alleinigen Zweck bestimmt, dass Sie die Vorteile des Dienstes in der Art und Weise nutzen und genießen, wie dies von Finder beabsichtigt und durch diesen Vertrag gestattet ist. Diese Lizenz und jede Zugriffsberechtigung zum Service werden automatisch widerrufen, wenn Sie eine der folgenden Handlungen vornehmen:

                            den Dienst oder im Dienst enthaltene Inhalte ohne unsere schriftliche Zustimmung für kommerzielle Zwecke zu nutzen.
                            urheberrechtlich geschütztes Material, Bilder, Marken, Handelsnamen, Dienstmarken oder sonstiges geistiges Eigentum, Inhalte oder eigentumsrechtlich geschützte Informationen, auf die über den Dienst zugegriffen werden kann, ohne die vorherige schriftliche Zustimmung von Finder zu kopieren, zu ändern, abgeleitete Werke davon zu erstellen, diese zu nutzen oder in irgendeiner Weise zu vervielfältigen.
                            zum Ausdruck zu bringen oder den Eindruck zu erwecken, dass Aussagen, die Sie machen, von Finder befürwortet werden.
                            Robots, Bots, Spider, Crawler, Webseiten-Such-/Recherche-Anwendungen, Proxy- oder andere manuelle oder automatische Geräte, Methoden oder Prozesse zu nutzen, um auf die Navigationsstruktur oder die Darstellung des Dienstes oder seiner Inhalte zuzugreifen, diese abzurufen, bei diesen "Data-Mining" zu betreiben oder diese in irgendeiner Weise zu vervielfältigen oder zu umgehen.
                            den Dienst in einer Weise zu nutzen, die den Dienst oder die Server oder die mit dem Dienst verbundenen Netzwerke beeinträchtigen, stören oder negative Auswirkungen auf diese haben könnten.
                            Viren oder einen anderen bösartigen Code hochzuladen oder anderweitig die Sicherheit des Dienstes zu gefährden.
                            Kopfzeilen zu fälschen oder anderweitig Identifikationsmerkmale zu manipulieren, um die Herkunft von über den Dienst übertragenen Informationen zu verschleiern.
                            Teile des Dienstes ohne die vorherige schriftliche Genehmigung von Finder zu "framen" oder zu "spiegeln".
                            Meta-Tags, Codes oder andere Geräte, die einen Verweis auf Finder oder den Dienst enthalten, (oder eine Marke, einen Handelsnamen, eine Dienstmarke, ein Logo oder Slogan von Finder) zu nutzen, um Personen für andere Zwecke auf andere Websites zu führen.
                            Teile unseres Dienstes zu ändern, anzupassen, unterzulizenzieren, zu übersetzen, zu verkaufen, zurückzuentwickeln, zu entschlüsseln, zu dekompilieren oder anderweitig zu zerlegen oder andere dazu bringen, dies zu tun.
                            Drittanwendungen, die mit dem Dienst oder den Inhalten oder Informationen von anderen Mitgliedern interagieren, ohne unsere schriftliche Zustimmung zu nutzen oder zu entwickeln.
                            die Anwendungsprogrammierschnittstelle von Finder ohne unsere schriftliche Zustimmung zu nutzen, darauf zuzugreifen oder diese zu veröffentlichen.
                            die Anfälligkeit unseres Dienstes oder eines Systems oder Netzwerks zu untersuchen, abzufragen oder zu prüfen.
                            Aktivitäten zu begünstigen oder zu fördern, die gegen diesen Vertrag verstoßen.
                            Finder kann Untersuchungen vornehmen und alle verfügbaren rechtlichen Schritte als Reaktion auf die illegale oder unerlaubte Nutzung des Dienstes unternehmen, einschließlich der Kündigung Ihres Kontos.

                            Jede Software, die wir Ihnen zur Verfügung stellen, kann automatisch Upgrades, Updates oder andere neue Funktionen herunterladen und installieren. Möglicherweise können Sie diese automatischen Downloads über die Einstellungen Ihres Geräts anpassen.

                            7. Rechte, die Sie Finder gewähren.
                            Indem Sie ein Benutzerkonto anlegen, erteilen Sie Finder ein weltweites, übertragbares, unterlizenzierbares, lizenzfreies Recht und die Lizenz, Informationen, zu denen Sie uns von Dritten wie Facebook Zugriff gewähren, zu hosten, zu speichern, zu nutzen, zu kopieren, darzustellen, zu reproduzieren, zu adaptieren, zu bearbeiten, zu veröffentlichen, zu verändern und zu verbreiten. Darunter fallen auch Informationen, die Sie auf dem Service posten, hochladen, darstellen oder auf andere Weise verfügbar machen (zusammen "posten") oder an andere Mitglieder übermitteln (zusammen "Inhalte"). Finders Lizenz an Ihren Inhalten ist nicht-exklusiv, mit der Ausnahme, dass Finders Lizenz in Hinblick auf veränderte Werke, die durch die Nutzung des Dienstes erstellt wurden, exklusiv ist. Finder hätte beispielsweise eine exklusive Lizenz an Screenshots des Dienstes, in denen Ihre Inhalte enthalten sind. Darüber hinaus autorisieren Sie Finder, in Ihrem Auftrag in Bezug auf die verletzende Nutzung Ihrer Inhalte, die von anderen Mitgliedern oder Dritten dem Dienst entnommen werden, zu agieren, damit Finder verhindern kann, dass Ihre Inhalte außerhalb des Dienstes genutzt werden. Dies beinhaltet ausdrücklich die Berechtigung, aber nicht die Pflicht, Mitteilungen gemäß 17 U.S.C. § 512(c)(3) (d. h. DMCA Takedown Notices) in Ihrem Namen zu senden, wenn Ihre Inhalte von Dritten vom Service entnommen und außerhalb des Dienstes verwendet werden. Unsere Lizenz auf Ihre Inhalte unterliegt Ihren Rechten nach anwendbarem Gesetz (zum Beispiel Gesetze, die den Schutz personenbezogener Daten regeln, soweit Inhalte persönliche Daten entsprechend den Regularien dieser Gesetze enthalten) und dient ausschließlich dem Zweck, den Dienst zu betreiben, zu entwickeln, bereitzustellen und zu verbessern sowie neue Dienste zu erforschen und zu entwickeln. Sie stimmen zu, dass jegliche Inhalte, die Sie auf dem Dienst platzieren oder die wir in Ihrem Auftrag auf dem Dienst platzieren, von anderen Mitgliedern angesehen werden können, die den Dienst besuchen oder an ihm teilnehmen (z. B. Personen, die möglicherweise von anderen Mitgliedern Finder-Inhalte angezeigt bekommen).

                            Sie stimmen zu, dass alle Informationen, die Sie nach dem Erstellen Ihres Kontos übermitteln, einschließlich der Informationen, die von Ihrem Facebook-Konto übermittelt werden, zutreffend und wahrheitsgemäß sind, und dass Sie das Recht haben, die Inhalte auf dem Dienst zu posten und Finder die oben erwähnte Lizenz zu gewähren.

                            Sie sind sich darüber bewusst und erklären sich damit einverstanden, dass wir jegliche Inhalte, die Sie im Rahmen eines Dienstes posten, überwachen und prüfen können. Wir können jegliche Inhalte, die nach unserem alleinigen Ermessen gegen diesen Vertrag verstoßen oder den Ruf des Dienstes schädigen könnten, ganz oder teilweise löschen.

                            Sie stimmen zu, bei der Kommunikation mit unseren Kundendienstmitarbeitern respektvoll und freundlich zu sein. Wenn wir der Auffassung sind, dass Ihr Verhalten gegenüber unseren Kundendienstmitarbeitern oder anderen Mitarbeitern zu irgendeinem Zeitpunkt drohend, belästigend oder beleidigend ist, behalten wir uns das Recht vor, Ihr Konto mit sofortiger Wirkung zu kündigen.

                            Als Gegenleistung dafür, dass Finder es Ihnen ermöglicht, den Dienst zu nutzen, erklären Sie sich damit einverstanden, dass wir, unsere verbundenen Unternehmen und unsere externen Partner Werbung auf dem Dienst platzieren können. Durch das Unterbreiten von Anregungen oder Feedback in Bezug auf unseren Dienst gegenüber Finder erklären Sie sich damit einverstanden, dass Finder dieses Feedback zu jeglichen Zwecken nutzen und teilen kann, ohne Sie dafür zu entschädigen.

                            Wir weisen Sie darauf hin, dass Finder auf Ihre Kontoinformationen und Inhalte zugreifen, diese speichern und offenlegen kann, wenn dies gesetzlich vorgeschrieben ist, indem es seinen Vertrag mit Ihnen ausführt, oder nach Treu und Glauben, dass dieser Zugriff, diese Speicherung oder Offenlegung einem berechtigten Interesse entspricht, um etwa: (i) einem rechtlichen Verfahren zu entsprechen; (ii) den Vertrag durchzusetzen; (iii) auf Behauptungen zu reagieren, dass irgendwelche Inhalte gegen die Rechte Dritter verstoßen; (iv) auf Ihre Anfragen beim Kundendienst zu reagieren; oder (v) die Rechte, das Eigentum oder die persönliche Sicherheit des Unternehmens oder einer anderen Person zu schützen.

                            8. Community-Regeln.
                            Durch die Nutzung des Dienstes erklären Sie sich damit einverstanden, Folgendes zu unterlassen:

                            den Dienst zu Zwecken zu nutzen, die illegal oder durch diesen Vertrag verboten sind.
                            den Dienst für schädliche oder schändliche Zwecke zu nutzen
                            den Dienst zu nutzen, um Finder zu schaden
                            gegen unsere Community-Richtlinien zu verstoßen, die von Zeit zu Zeit aktualisiert werden.
                            Spam zu versenden, Geld von anderen Mitgliedern zu erbitten oder diese zu betrügen.
                            sich als eine andere natürliche oder juristische Person auszugeben oder Bilder von einer anderen Person ohne deren Erlaubnis zu posten.
                            andere zu mobben, zu "stalken", einzuschüchtern, anzugreifen, zu belästigen, schlecht zu behandeln oder zu diffamieren.
                            Inhalte zu posten, welche die Rechte einer Person verletzen oder gegen diese verstoßen, einschließlich der Öffentlichkeits-, Datenschutz-, Urheber-, Markenrechte oder anderer Rechte des geistigen Eigentums oder des Vertragsrechts.
                            Inhalte zu posten, die Hassreden darstellen, bedrohend, sexuell explizit oder pornografisch sind.
                            Inhalte zu posten, die zu Gewalt aufrufen oder Nacktheit oder grafische oder grundlose Gewalt enthalten.
                            jegliche Inhalte zu posten, die Rassismus, Fanatismus, Hass oder Körperverletzung jeglicher Art gegen jegliche Gruppe oder Einzelpersonen fördern.
                            Passwörter zu jedwedem Zweck oder personenbezogene Daten für kommerzielle oder gesetzwidrige Zwecke von anderen Mitgliedern abzufragen oder die personenbezogenen Daten anderer Personen ohne die Zustimmung der entsprechenden Person zu verbreiten.
                            das Konto eines anderen Mitglieds zu verwenden, ein Konto mit einem anderen Mitglied zu teilen oder mehr als ein Konto zu unterhalten.
                            ein anderes Konto zu erstellen, wenn wir bereits Ihr Konto gekündigt haben, es sei denn, Sie haben unsere Erlaubnis.
                            Finder behält sich das Recht vor, Ihr Konto ohne eine Rückerstattung für irgendwelche Käufe zu prüfen und/oder zu kündigen, wenn Sie gegen diese Vereinbarung verstoßen haben, den Dienst missbraucht oder sich in einer Weise verhalten haben, die Finder als unangemessen oder rechtswidrig betrachtet, darunter Handlungen oder Kommunikation, die innerhalb oder außerhalb des Dienstes stattfinden. Darüber hinaus können wir in bestimmten Fällen Ihr Konto für Verstöße gegen die geltenden Bedingungen der Match Group Unternehmensfamilie kündigen, zu der neben Finder auch Dienste wie OkCupid, Plenty of Fish, Match, Meetic, BlackPeopleMeet, LoveScout24, OurTime, Pairs, ParPerfeito und Twoo (für weitere Details klicken Sie bitte hier) gehören. Falls Sie gegen diese Regeln oder unsere Community-Richtlinien verstoßen, wird Ihre Erlaubnis zur Nutzung des Dienstes automatisch widerrufen.

                            9. Inhalte von anderen Mitgliedern.
                            Obwohl sich Finder das Recht vorbehält, Inhalte, die gegen diesen Vertrag verstoßen, zu prüfen und zu entfernen, liegen solche Inhalte in der alleinigen Verantwortung des Mitglieds, das diese postet, und Finder kann nicht garantieren, dass sämtliche Inhalte mit diesem Vertrag im Einklang stehen. Wenn Sie Inhalte auf dem Dienst bemerken, die gegen diesen Vertrag verstoßen, melden Sie dies bitte innerhalb des Dienstes oder über unser Kontaktformular.

                            10. Käufe.
                            Allgemeines. Von Zeit zu Zeit kann Finder Produkte oder Dienste zum Kauf ("In-App-Käufe") über den App Store, den Google Play Store, Netzbetreiberabrechnungen, Finder-Direktzahlungen oder andere von Finder autorisierte Bezahlplattformen anbieten. Wenn Sie sich für einen In-App-Kauf entscheiden, werden Sie aufgefordert, Ihren Kauf bei dem entsprechenden Zahlungsanbieter zu bestätigen, und Ihre Zahlungsmethode (Ihre Karte oder das Konto eines Drittanbieters wie Google Play Store oder App Store) (Ihre "Bezahlmethode") wird für den In-App-Kauf zu den Preisen angewandt, die für die von Ihnen ausgewählten Dienste angezeigt werden, sowie jegliche Mehrwertsteuer oder ähnliche Steuern, die möglicherweise auf Ihre Zahlungen erhoben werden, und Sie ermächtigen Finder oder den Drittanbieter, falls zutreffend, die entsprechende Gebühr in Rechnung zu stellen.

                            Automatische Erneuerung; Automatische Kartenzahlung

                            Wenn Sie ein automatisch wiederkehrendes, regelmäßiges Abonnement über einen In-App-Kauf erwerben, wird Ihre Bezahlmethode fortlaufend, bis zu Ihrer Kündigung, für das Abonnement belastet. Nach Ihrer anfänglichen Abonnementbindungsdauer und erneut nach jeder folgenden Abonnementdauer läuft Ihr Abonnement automatisch für eine entsprechende Dauer weiter, und zwar zu dem Preis, dem Sie beim Abschluss zugestimmt haben. Ihre Kartenzahlungsinformationen werden gemäß dem Vertrag gespeichert und anschließend für die automatische Kartenzahlung verwendet.

                            Einwände gegen eine bereits geleistete Zahlung müssen bei einer Abrechnung durch Finder an den Kundensupport oder an das entsprechende Drittanbieter-Konto wie den App Store gerichtet werden. Sie können auch Einspruch erheben, indem Sie Ihre Bank oder Ihren Bezahldienst kontaktieren, die Ihnen weitere Informationen über Ihre Rechte und über geltende Fristen zur Verfügung stellen können. Sie können Ihre Einwilligung zu automatischen Kartenzahlungen jederzeit in den Einstellungen von Finder oder in dem entsprechenden Konto des Drittanbieters bedingungslos widerrufen. Wir weisen Sie jedoch darauf hin, dass Sie weiterhin zur Zahlung ausstehender Beträge verpflichtet sind.

                            Wenn Sie Ihr Abonnement ändern oder beenden möchten, müssen Sie sich in Ihr Konto beim Drittanbieter einloggen (oder, falls zutreffend, die Einstellungen von Finder aufrufen) und den Anweisungen zur Beendigung oder Kündigung Ihres Abonnements folgen, selbst wenn Sie Ihr Konto bei uns oder die Finder-Anwendung von Ihrem Gerät gelöscht haben. Die Löschung Ihres Kontos bei Finder oder das Löschen der Finder-App von Ihrem Gerät führt nicht zur Beendigung oder Kündigung Ihres Abonnements; Finder behält sämtliche Gelder, mit denen Ihre Bezahlmethode belastet wird, bis Sie Ihr Abonnement über Ihr Finder- oder Drittanbieter-Konto, soweit zutreffend, beenden oder kündigen. Wenn Sie Ihr Abonnement beenden oder kündigen, können Sie Ihr Abonnement bis zum Ende der Laufzeit des aktuellen Abonnementzeitraums nutzen und Ihr Abonnement wird sich nicht verlängern, wenn der Zeitraum abläuft.

                            Weitere Bedingungen, die bei einer Direktzahlung an Finder mit Ihrer Bezahlmethode gelten. Bei einer Direktzahlung an Finder kann Finder mögliche Abrechnungsfehler oder Fehler korrigieren, auch wenn es bereits die Zahlung angefordert oder erhalten hat. Wenn Sie eine Rückbuchung vornehmen oder auf andere Weise eine Zahlung über Ihre Bezahlmethode rückgängig machen, kann Finder Ihr Benutzerkonto nach alleinigem Ermessen umgehend kündigen.

                            Sie können die Daten Ihrer Bezahlmethode bearbeiten, indem Sie zu Finder gehen und die Einstellungen aufrufen. Wenn eine Zahlung nicht erfolgreich war, z. B. durch Ungültigkeit, unzureichende Deckung oder aus einem anderen Grund, und Sie die Informationen Ihrer Bezahlmethode nicht bearbeiten oder Ihr Abonnement beenden oder kündigen, bleiben Sie verantwortlich für nicht gezahlte Beträge und ermächtigen uns, weiterhin über die Bezahlmethode, die Sie bearbeiten können, die Gebühren zu erheben. Dies kann eine Änderung Ihrer Abrechnungsdaten zur Folge haben. Darüber hinaus berechtigen Sie uns, aktualisierte oder neue Gültigkeitstermine und Kartennummern für Ihre Kredit- oder Bankkarte zu beziehen, wie vom Aussteller Ihrer Kredit- oder EC-Karte bereitgestellt. Die Zahlungsbedingungen basieren auf Ihrer Bezahlmethode und können durch Vereinbarungen zwischen Ihnen und dem Finanzinstitut, dem Kreditkartenaussteller oder einem anderen Anbieter Ihrer gewählten Bezahlmethode festgelegt sein. Wenn Sie außerhalb von Amerika ansässig sind, stimmen Sie zu, dass Ihre Zahlung an Finder über MTCH Technology Services Limited erfolgt.

                            Virtuelle Gegenstände. Von Zeit zu Zeit können Sie möglicherweise eine begrenzte, persönliche, nicht übertragbare, nicht unterlizenzierbare, widerrufliche Lizenz zur Verwendung "virtueller Gegenstände" erwerben oder erhalten, einschließlich virtueller Produkte oder virtueller "Münzen" oder anderer Währungen bzw. Einheiten, die innerhalb des Dienstes für virtuelle Produkte eintauschbar sind (zusammen "Virtuelle Gegenstände"). Jegliche in Ihrem Konto angezeigten Salden für virtuelle Gegenstände stellen keine echten Salden dar oder geben keinen gespeicherten Wert wieder, sondern erfassen den Umfang Ihrer Lizenz. Für die Nichtbenutzung von virtuellen Gegenständen fällt keine Gebühr an; die Ihnen für virtuelle Gegenstände gewährte Lizenz endet jedoch gemäß den Bestimmungen dieses Vertrags, wenn Finder die Bereitstellung des Dienstes einstellt oder Ihr Konto anderweitig geschlossen oder gekündigt wird. Finder behält sich nach alleinigem Ermessen das Recht vor, Gebühren für den Zugriff auf oder die Nutzung von virtuellen Gegenständen zu erheben, und kann virtuelle Gegenstände mit oder ohne Gebühr bereitstellen. Finder kann virtuelle Gegenstände jederzeit verwalten, regulieren, kontrollieren, verändern oder entfernen. Finder haftet weder Ihnen noch Dritten gegenüber, falls Finder jegliche dieser Rechte ausübt. Virtuelle Gegenstände können nur über den Dienst eingelöst werden. JEGLICHE KÄUFE UND EINLÖSUNGEN VON VIRTUELLEN GEGENSTÄNDEN, DIE DURCH DEN DIENST GETÄTIGT WERDEN, SIND ENDGÜLTIG UND NICHT ERSTATTUNGSFÄHIG. Die Bereitstellung virtueller Gegenstände zur Nutzung im Rahmen des Dienstes ist eine Leistung, die unmittelbar mit der Annahme Ihres Kaufs solcher virtuellen Gegenstände beginnt. SIE ERKENNEN AN, DASS FINDER AUS KEINERLEI GRÜNDEN ZU EINER RÜCKERSTATTUNG VIRTUELLER GEGENSTÄNDE VERPFLICHTET IST, UND DASS SIE BEI EINER KONTOSCHLIESSUNG KEIN GELD ODER EINE ANDERE VERGÜTUNG FÜR NICHT VERWENDETE VIRTUELLE GEGENSTÄNDE ERHALTEN, EGAL OB DIE SCHLIESSUNG FREIWILLIG ODER UNFREIWILLIG WAR.

                            Rückerstattungen. Generell sind alle Gebühren für Käufe nicht erstattungsfähig und es gibt keine Rückerstattungen oder Gutschriften für teilweise verbrauchte Zeiträume. Wir können eine Ausnahme machen, wenn eine Rückerstattung für ein Abonnementangebot innerhalb von vierzehn Tagen nach dem Datum der Transaktion angefordert wird, oder wenn die in Ihrer Gerichtsbarkeit geltenden Gesetze Rückerstattungen vorsehen.

                            Als Abonnenten mit Wohnsitz in der EU oder im Europäischen Wirtschaftsraum haben Sie entsprechend der lokalen Gesetze innerhalb von 14 Tagen nach Beginn des Abonnements Anspruch auf eine Rückerstattung in voller Höhe, ohne Gründe angeben zu müssen. Beachten Sie bitte, dass diese 14-tägige Frist mit Beginn des Abonnements beginnt.

                            Als Abonnenten und Käufer von virtuellen Gegenständen mit Wohnsitz in Südkorea haben Sie entsprechend der lokalen Gesetze innerhalb von 7 Tagen nach Kaufabschluss Anspruch auf eine Rückerstattung Ihres Abonnements und/oder ungenutzter virtueller Gegenstände in voller Höhe. Beachten Sie bitte, dass diese 7-tägige Frist mit dem Kaufabschluss beginnt.

                            Mit Ausnahme der oben genannten Sonderregelungen für Mitglieder mit Wohnsitz in Südkorea sind Käufe von virtuellen Gegenständen RECHTSKRÄFTIG UND NICHT ERSTATTUNGSFÄHIG.

                            Anforderung von Rückerstattungen:

                            Wenn Sie einen Kauf unter Verwendung Ihrer Apple-ID abgeschlossen haben, werden Erstattungen über Apple abgewickelt, nicht über Finder. Um eine Rückerstattung anzufordern, gehen Sie zum App Store, klicken Sie auf Ihre Apple-ID, wählen Sie "Kaufhistorie" aus, suchen Sie die Transaktion und drücken Sie auf "Problem melden". Zudem können Sie auch ein Gesuch über https://getsupport.apple.com einreichen.

                            Wenn Sie einen Kauf unter Verwendung Ihres Kontos im Google Play Store abgeschlossen haben: Kontaktieren Sie den Kundensupport unter Angabe Ihrer Bestellnummer für den Google Play Store (Sie finden die Bestellnummer in der Bestellbestätigungs-E-Mail, oder indem Sie sich bei Google Wallet anmelden) oder von Finder direkt (diese können Sie Ihrer Bestätigungs-E-Mail entnehmen). Sie können auch ein unterzeichnetes und datiertes Schreiben, in dem Sie erklären, dass Sie, der Käufer, diesen Vertrag kündigen, oder das eine Mitteilung von gleicher Wirkung enthält, per Post senden oder zustellen. Bitte teilen Sie uns neben der Bestellnummer auch die mit Ihrem Konto verknüpfte E-Mail-Adresse oder Handynummer mit. Dieses Schreiben ist an folgende Adresse zu richten: Finder, Attn: Cancellations, P.O. Box 25472, Dallas, Texas 75225, USA.

                            Wenn Sie von Ihrem Recht auf Stornierung Gebrauch machen (mit Ausnahme von Käufen, die Sie über Ihre Apple-ID getätigt haben und die von Apple reguliert werden), erstatten wir (oder fordern Google zur Erstattung auf) alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und in jedem Fall innerhalb von 14 Tagen nach Empfang Ihrer Vertragskündigung. Die Rückerstattung erfolgt unter Verwendung der gleichen Zahlungsmittel, die Sie bei der ursprünglichen Transaktion verwendet haben. In keinem Fall werden Ihnen aufgrund der Rückerstattung Gebühren berechnet.

                            Wenn Sie einen Kauf über eine Bezahlplattform abgeschlossen haben, die nicht oben aufgeführt ist, fordern Sie eine Erstattung bitte direkt beim Drittanbieter an, über den Sie den Kauf getätigt haben.

                            Sie können eine Bestellung für die Bereitstellung von digitalen Inhalten, die nicht auf einem physischen Datenträger geliefert werden, nicht stornieren, wenn die Bestellabwicklung mit Ihrer ausdrücklichen vorherigen Zustimmung und der Bestätigung, dass Sie dadurch Ihr Widerrufsrecht verlieren, begonnen hat. Dies gilt z. B. für Käufe von virtuellen Gegenständen. Das bedeutet: Diese Käufe sind ENDGÜLTIG UND NICHT ERSTATTUNGSFÄHIG.

                            Preisgestaltung. Finder ist ein global agierendes Unternehmen und unsere Preisgestaltung hängt von einer Reihe von Faktoren ab. Wir bieten häufig Sondertarife an, die je nach Region, Abonnement, Bundlegröße etc. variieren. Weiterhin testen wir regelmäßig neue Features und Bezahlmethoden.

                            11. Mitteilung und Verfahrensweise zur Geltendmachung von Ansprüchen aufgrund von Urheberrechtsverletzung.
                            Wenn Sie der Auffassung sind, dass Ihr Werk kopiert und auf dem Dienst in einer Weise gepostet wurde, die eine Urheberrechtsverletzung darstellt, reichen Sie bitte hier über das Formular eine Löschanfrage ein.

                            Wenn Sie uns über eine angebliche Urheberrechtsverletzung unterrichten, geben Sie bitte folgende Informationen an:

                            eine elektronische oder physische Unterschrift der Person, die im Namen des Inhabers der urheberrechtlichen Ansprüche zu handeln befugt ist;
                            eine Beschreibung der geschützten Arbeit, deren Urheberrechte Ihrer Ansicht nach verletzt wurden;
                            eine Beschreibung dahingehend, wo sich das Material, das Ihrer Ansicht nach Rechte verletzt, auf dem Dienst befindet (wobei diese Beschreibung ausreichend detailliert sein muss, damit wir das mutmaßlich urheberrechtsverletzende Material finden können);
                            Ihre Kontaktdaten, einschließlich Anschrift, Telefonnummer und E-Mail-Adresse, sowie die Identität der Person, der die Urheberrechte gehören;
                            eine schriftliche Erklärung von Ihnen, dass Sie nach Treu und Glauben der Ansicht sind, dass die umstrittene Nutzung vom Urheberrechtsinhaber, dessen Beauftragten oder per Gesetz nicht gestattet ist; und
                            eine Erklärung von Ihnen, dass die oben erwähnten Daten in Ihrer Mitteilung korrekt sind, und dass Sie der Urheberrechtsinhaber sind bzw. bevollmächtigt sind, im Namen des Urheberrechtsinhabers zu handeln.
                            Finder wird die Konten von Rechtsverletzern, die sich wiederholt Verstöße zuschulden kommen lassen, kündigen.

                            12. Haftungsausschlüsse.
                            FINDER STELLT DEN DIENST OHNE MÄNGELGEWÄHR UND IN DER VERFÜGBAREN FORM SOWIE IN DEM UMFANG, DER DURCH GELTENDES RECHT ZULÄSSIG IST, BEREIT UND GEWÄHRT KEINE GARANTIEN JEDWEDER ART, OB AUSDRÜCKLICH, STILLSCHWEIGEND, GESETZLICH ODER ANDERWEITIG IM HINBLICK AUF DEN DIENST (EINSCHLIESSLICH ALLER DARIN ENTHALTENEN INHALTE), EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF JEDWEDE STILLSCHWEIGENDE GARANTIEN FÜR ZUFRIEDENSTELLENDE QUALITÄT, MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK ODER NICHTVERLETZUNG. FINDER SICHERT NICHT ZU UND GARANTIERT NICHT, DASS (A) DER DIENST UNUNTERBROCHEN, SICHER ODER FEHLERFREI SEIN WIRD, (B) ETWAIGE MÄNGEL ODER FEHLER IM DIENST BEHOBEN WERDEN, ODER (C) DASS INHALTE ODER INFORMATIONEN, DIE SIE AUF DEM DIENST ODER DURCH DIESEN ERHALTEN, KORREKT SIND.

                            FINDER ÜBERNIMMT KEINE VERANTWORTUNG FÜR INHALTE, DIE SIE, ANDERE MITGLIEDER ODER DRITTE ÜBER DEN DIENST POSTEN, VERSENDEN ODER ERHALTEN. DER ZUGRIFF AUF JEGLICHES MATERIAL, DAS HERUNTERGELADEN ODER DURCH DIE NUTZUNG DES DIENSTES ANDERWEITIG ERHALTEN WIRD, ERFOLGT NACH EIGENEM ERMESSEN UND AUF EIGENE GEFAHR.

                            13. Dienste Dritter.
                            Der Dienst kann Werbung und Werbeaktionen, die von Dritten angeboten werden, sowie Links zu anderen Websites oder Internet-Ressourcen enthalten. Finder ist nicht verantwortlich für die Verfügbarkeit (oder mangelnde Verfügbarkeit) solcher externen Websites oder Internet-Ressourcen. Wenn Sie beschließen, mit Dritten über unseren Dienst zu interagieren, unterliegt deren Beziehung mit Ihnen den Bedingungen dieser Dritten. Finder ist nicht verantwortlich oder haftbar für die Bedingungen oder Maßnahmen dieser Dritten.

                            14. Haftungsbeschränkung.
                            IM GRÖSSTMÖGLICHEN DURCH GELTENDES RECHT ZULÄSSIGEN UMFANG ÜBERNEHMEN FINDER, SEINE VERBUNDENEN UNTERNEHMEN, MITARBEITER, LIZENZGEBER ODER DIENSTLEISTER KEINE HAFTUNG FÜR INDIREKTE, FOLGE-, EXEMPLARISCHE, ZUFÄLLIGE, SPEZIELLE, STRAF- ODER ERWEITERTE SCHÄDEN, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF ENTGANGENE GEWINNE, OB DIREKT ODER INDIREKT VERURSACHT, ODER DATENVERLUSTE, FIRMENWERTVERLUSTE, ENTGANGENE NUTZUNG ODER ANDERE IMMATERIELLE VERLUSTE, DIE SICH AUS FOLGENDEM ERGEBEN: (I) IHRER NUTZUNG ODER IHREM ZUGRIFF AUF DIE DIENSTE BZW. IHRER UNFÄHIGKEIT, DEN DIENST ZU NUTZEN, (II) DEM VERHALTEN ODER DEN INHALTEN ANDERER MITGLIEDER ODER DRITTER IN VERBINDUNG MIT DER NUTZUNG DES DIENSTES; ODER (III) UNERLAUBTEM ZUGRIFF, UNERLAUBTER NUTZUNG ODER UNERLAUBTER VERÄNDERUNG IHRER INHALTE, SELBST WENN FINDER AUF DIE MÖGLICHKEIT SOLCHER SCHÄDEN HINGEWIESEN WURDE. KEINESFALLS ABER ÜBERSTEIGT DIE GESAMTHAFTUNG VON FINDER IHNEN GEGENÜBER IN BEZUG AUF ALLE ANSPRÜCHE IM ZUSAMMENHANG MIT DEM DIENST DEN VON IHNEN GEGEBENENFALLS AN FINDER FÜR DEN DIENST GEZAHLTEN BETRAG UND 100 US-DOLLAR, WÄHREND SIE ÜBER EIN KONTO VERFÜGEN.

                            EINIGE GERICHTSBARKEITEN SEHEN DEN AUSSCHLUSS ODER DIE EINSCHRÄNKUNG VON BESTIMMTEN SCHÄDEN NICHT VOR, SODASS EINIGE ODER ALLE AUSSCHLÜSSE UND EINSCHRÄNKUNGEN IN DIESEM ABSCHNITT MÖGLICHERWEISE FÜR SIE NICHT GELTEN.

                            15. Schiedsverfahren, Verzicht auf Sammelklagen und Schwurgerichtsverfahren.
                            Mit Ausnahme von Mitgliedern, die ihren Wohnsitz in der Europäischen Union oder dem Europäischen Wirtschaftsraum oder anderorts haben, wo dies durch geltendes Recht verboten ist, gilt Folgendes:

                            Das ausschließliche Mittel zur Beilegung von Streitigkeiten oder Aufklärung von Ansprüchen, die sich aus diesem Vertrag ergeben oder mit diesem im Zusammenhang stehen (einschließlich aller angeblichen Vertragsverletzungen), oder die sich aus diesem Dienst ergeben oder mit diesem im Zusammenhang stehen, ist das VERBINDLICHE SCHIEDSVERFAHREN, das von JAMS gemäß den Schlichtungsregeln und - verfahren von JAMS (im Original "Streamlined Arbitration Rules & Procedures") geführt wird, mit Ausnahme der Modifizierungen in unseren Schlichtungsverfahren. Die einzige Ausnahme von der Ausschließlichkeit des Schlichtungsverfahrens besteht darin, dass jede Partei das Recht hat, eine Einzelklage gegen die andere Partei bei einem zuständigen Bagatellgericht zu erheben, oder dass die reagierende Partei, falls eine Klage in einem Schiedsverfahren eingereicht wird, verlangen kann, dass der Streit an einem Bagatellgericht geführt wird, wenn die Klage in die Zuständigkeit des Bagatellgerichts fällt. Wird der Antrag auf Klage vor einem Bagatellgericht gestellt, bevor ein Schlichter bestellt wurde, wird das Schiedsverfahren administrativ geschlossen. Wird der Antrag auf Klage vor einem Bagatellgericht gestellt, nachdem ein Schlichter bestellt wurde, entscheidet der Schlichter, ob der Streitfall in einem Schlichtungsverfahren verbleibt oder vor einem Bagatellgericht entschieden wird. Ein solches Schiedsverfahren soll ausschließlich in schriftlicher Form stattfinden, es sei denn, Sie oder Finder nehmen das Recht einer Anhörung vor dem Schiedsrichter in Anspruch. Doch ganz gleich, ob Sie sich für ein Schiedsverfahren oder ein Bagatellgericht entscheiden, dürfen Sie unter keinen Umständen gegen das Unternehmen Sammelklagen, Gruppenschiedsverfahren oder andere Verbandsklagen oder -verfahren gegen Finder vorbringen.
                            Durch die Nutzung des Dienstes in irgendeiner Weise erklären Sie sich mit der vorstehenden Schiedsvereinbarung einverstanden. Damit GEBEN SIE IHR RECHT AUF, VOR GERICHT ZU GEHEN, um jegliche Ansprüche zwischen Ihnen und dem Unternehmen geltend zu machen oder diese zu verteidigen (außer bei Sachen, die an Bagatellgerichte geleitet werden können). SIE GEBEN AUSSERDEM IHR RECHT AUF, AN SAMMELKLAGEN ODER ANDEREN SAMMELVERFAHREN TEILZUNEHMEN. Wenn Sie eine Klage gegenüber Finder außerhalb des Bagatellgerichts geltend machen (und Finder nicht beantragt, dass die Klage an ein Bagatellgericht geleitet wird), werden Ihre Rechte von einem NEUTRALEN SCHLICHTER, NICHT VON EINEM RICHTER ODER VON GESCHWORENEN, bestimmt, und der Schlichter entscheidet alle Ansprüche und alle Fragen bezüglich der Schiedsgerichtsbarkeit des Streitgegenstandes. Sie haben Anspruch auf eine faire Anhörung vor dem Schlichter. Der Schlichter kann üblicherweise jedes Rechtsmittel gewähren, das ein Gericht gewähren kann, einschließlich der Möglichkeit, einen dispositiven Antrag zu hören (der einen dispositiven Antrag auf der Grundlage der Prozessschriftsätze der Parteien sowie einen dispositiven Antrag auf der Grundlage der Prozessschriftsätze der Parteien zusammen mit den eingereichten Beweismitteln umfassen kann), aber Sie sollten beachten, dass Schlichtungsverfahren in der Regel einfacher und gestraffter sind als Gerichtsverhandlungen und andere Gerichtsverfahren. Entscheidungen des Schlichters sind gerichtlich vollstreckbar und können von einem Gericht nur bedingt aufgehoben werden. Einzelheiten zur Streitschlichtung finden Sie in unseren Schlichtungsverfahren.
                            Alle Verfahren zur Durchsetzung dieser Schiedsvereinbarung, einschließlich aller Verfahren zur Bestätigung, Änderung oder Aufhebung eines Schiedsspruchs, können vor jedem zuständigen Gericht eingeleitet werden. Für den Fall, dass diese Schiedsvereinbarung aus irgendeinem Grund als nicht durchsetzbar betrachtet wird, kann ein Rechtsstreit gegen das Unternehmen (außer bei Klagen vor Gerichten für geringfügige Forderungen) ausschließlich vor Bundes- oder einzelstaatlichen Gerichten in Dallas County, Texas, USA, eingeleitet werden. Sie stimmen hiermit unwiderruflich der Zuständigkeit dieser Gerichte für diese Zwecke zu.
                            Die Online-Plattformen der Europäischen Kommission zur Beilegung von Streitigkeiten steht unter http://ec.europa.eu/odr zur Verfügung. Finder beteiligt sich nicht an Streitbeilegungsverfahren vor einem Schiedsgericht für Verbraucherschutz für Mitglieder mit Wohnsitz in der EU oder im Europäischen Wirtschaftsraum.
                            16. Geltendes Recht.
                            Für Mitglieder, die ihren Wohnsitz in der Europäischen Union oder dem Europäischen Wirtschaftsraum oder andernorts haben, wo unsere Schiedsvereinbarung gesetzlich verboten ist, gelten die Gesetze von Texas, USA, mit Ausnahme der Kollisionsnormen von Texas, für alle Streitigkeiten, die sich aus diesem Vertrag oder Dienst ergeben oder mit diesen im Zusammenhang stehen. Ungeachtet der vorstehenden Ausführungen unterliegt die Schlichtungsvereinbarung in Abschnitt 15 dem Federal Arbitration Act. Zur Klarstellung wird darauf hingewiesen, dass die Wahl des in Texas geltenden Rechts keinen Vorrang gegenüber der zwingenden Verbraucherschutzgesetzgebung in diesen Gerichtsbarkeiten hat.

                            17. Gerichtsstand.
                            Mit Ausnahme von Mitgliedern, die ihren Wohnsitz in der Europäischen Union oder im Europäischen Wirtschaftsraum haben, und die Klagen in ihrem Wohnsitzland entsprechend dem geltenden Recht vorbringen können, und mit Ausnahme von Klagen, die in einem Gericht für Bagatellsachen der zuständigen Gerichtsbarkeit vorgebracht werden, werden alle Klagen, die sich aus diesem Vertrag oder dem Dienst oder Ihrer Beziehung mit Finder ergeben und aus welchem Grund auch immer keinem Schiedsverfahren vorgelegt werden, ausschließlich in den Bundes- oder einzelstaatlichen Gerichten in Dallas County, Texas, USA, geführt. Sie und Finder stimmen der persönlichen Gerichtsbarkeit dieser Gerichte im Bundesstaat Texas zu und verzichten auf jegliche Behauptung, dass diese Gerichte einen ungünstigen Gerichtsstand darstellen.

                            18. Schadloshaltung Ihrerseits.
                            Sie verpflichten sich, in dem durch geltendes Recht zulässigen Umfang, Finder, seine verbundenen Unternehmen und deren jeweilige Führungskräfte, Direktoren, Beauftragte und Mitarbeiter in Bezug auf sämtliche Klagen, Forderungen, Ansprüche, Schäden, Verluste, Kosten, Verbindlichkeiten, Ausgaben sowie Anwaltskosten zu entschädigen, zu verteidigen und schadlos zu halten, die sich aufgrund Ihres Zugriffs auf den Dienst oder dessen Nutzung, Ihrer Inhalte oder aus Verstößen Ihrerseits gegen diesen Vertrag ergeben oder in irgendeinem Zusammenhang mit diesen stehen.

                            19. Gesamtheit des Vertrags; Sonstiges.
                            Dieser Vertrag, inklusive der darin enthaltenen Datenschutzrichtlinie, den Cookie-Richtlinien, den Sicherheitstipps, den Community-Guidelines und den Schlichtungsverfahren (falls für Sie zutreffend) und allen Bedingungen, die Ihnen offengelegt wurden und denen Sie zugestimmt haben, wenn Sie zusätzliche Funktionen, Produkte oder Dienste erwerben, die wir im Rahmen des Dienstes anbieten, stellt den gesamten Vertrag zwischen Ihnen und Finder hinsichtlich der Nutzung des Dienstes dar. Sollte eine Bestimmung dieses Vertrags als unwirksam erachtet werden, bleibt der Rest dieses Vertrages vollumfänglich in Kraft. Die Nichtausübung oder Nichtdurchsetzung eines Rechts oder einer Bestimmung dieses Vertrags durch das Unternehmen stellt keinen Verzicht auf dieses Recht oder diese Bestimmung dar. Sie erklären sich damit einverstanden, dass Ihr Finder-Konto nicht übertragbar ist, und dass alle Ihre Rechte an Ihrem Konto und an dessen Inhalten nach Ihrem Tod enden. Dieser Vertrag begründet keine Agentur, keine Partnerschaft, kein Joint Venture, kein Treuhänderverhältnis oder sonstige besondere Beziehung und kein Arbeitsverhältnis und Sie dürfen keinerlei Zusicherungen machen oder Finder in irgendeiner Weise binden.
                        </Text>
                        <Text />
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 20
                        }}>
                            Impressum
                        </Text>
                        <Text> </Text>
                        <Text>Verantwortliche/r für den Inhalt dieser App:</Text>
                        <Text> </Text>
                        <Text>Jost Tomke Müller</Text>
                        <Text>Carl-Zuckmayer-Straße 16</Text>
                        <Text>68169 Mannheim</Text>
                        <Text>E-Mail: jost-tomke-mueller@t-online.de</Text>
                        <Text> </Text>
                        <Text>Babett Müller</Text>
                        <Text>Wörthfelder Weg 19</Text>
                        <Text>68239 Mannheim</Text>
                        <Text>E-Mail: mueller_babett@web.de</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default DetailsScreen