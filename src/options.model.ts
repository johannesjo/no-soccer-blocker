export interface OptionsModel {
  words: string;
  btnTxt: string;
  isJustRemove?: boolean;
}

export const DEFAULT_OPTS: OptionsModel = {
  words: ['Fußball', 'Bundesliga', 'Derby', 'Tabellenplatz', 'Geisterspiel', 'Spieltag', 'Schalke', 'FC Bayern', 'Wechsel-Poker', 'DFB', 'Hertha', 'FC ', 'Strafraum', 'Eintracht Frankfurt', 'Einzelkritik', 'Torjubel', 'Top-Spiel', 'ohne Fans', 'Konferenzticker', 'sehenswerte Einzelaktion', 'holt Punkt', 'Bayern München', 'Borussia Dortmund', 'Strafstoß', 'Ligaspiel', 'Union Berlin'].join(','),
  btnTxt: 'Langweilig',
  isJustRemove: false,
};
