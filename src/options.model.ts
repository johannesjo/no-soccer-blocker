export interface OptionsModel {
  words: string;
  btnTxt: string;
}

export const DEFAULT_OPTS: OptionsModel = {
  words: ['Fußball', 'Bundesliga', 'Derby', 'Tabellenplatz', 'Geisterspiel', 'Spieltag', 'Schalke', 'FC Bayern', 'Wechsel-Poker', 'DFB', 'Hertha', 'FC ', 'Strafraum', 'Eintracht Frankfurt', 'Einzelkritik', 'Torjubel', 'Top-Spiel', 'ohne Fans', 'Konferenzticker'].join(','),
  btnTxt: 'Langweilig'
};
