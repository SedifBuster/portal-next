import { useState } from "react";


export function useLocalStorage<T>(key: string, initialValue: T) {
    // Состояние для хранения нашего значения
    // Передаем функцию начального состояния в useState, чтобы логика выполнялась только один раз
    const [storedValue, setStoredValue] = useState<T>(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        // Получаем из локального хранилища по ключу
        const item = window.localStorage.getItem(key);
        // Разбираем сохраненный json или, если его нет, возвращаем начальное значение.
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // Если ошибка также возвращает начальное значение
        console.log(error);
        return initialValue;
      }
    });
    // Возвращает завернутую версию функции установки useState, которая...
    // ... сохраняет новое значение в localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
      try {
        // Разрешить значение быть функцией, чтобы у нас был тот же API, что и у useState.
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Сохранить состояние
        setStoredValue(valueToStore);
        // Сохранить в локальное хранилище
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // Более продвинутая реализация будет обрабатывать случай ошибки.
        console.log(error);
      }
    };
    return [storedValue, setValue] as const;
    }