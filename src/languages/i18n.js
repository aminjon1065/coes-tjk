import i18next from "i18next";
import ru from './ru.json'
import tj from "./tj.json"
// import en from "./en.json"
import {initReactI18next} from "react-i18next";


i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: "ru",
    resources: {
        ru: ru,
        tj: tj,
        // en: en
    },
    react: {
        useSuspense: false
    }
})

export default i18next;