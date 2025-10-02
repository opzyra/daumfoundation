/* eslint-disable */
export default class RegexUtils {
  static content = /[^(<p><br><\/p>)]/;
  static phone =
    /^(01[016789]{1}|02|031|032|033|041|042|043|051|052|053|054|055|061|062|063|064|070|080|050|0507)-?[0-9]{3,4}-?[0-9]{4}$/;
  static url = /(http(s)?:\/\/).*/gi;
  static email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
}
