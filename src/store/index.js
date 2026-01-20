import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import CryptoJS from "crypto-js";

const SECURE_LOCAL_STORAGE_HASH_KEY = "WIDAI__STORAGE__HASHKEY__2025";

const EncryptedStorage = {
    getItem(key) {
      const value = localStorage.getItem(key);
  
      if (value) {
        const decryptedBytes = CryptoJS.AES.decrypt(value, SECURE_LOCAL_STORAGE_HASH_KEY)
        const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedValue
      }
  
      return value
    },
    setItem(key, value) {
      const encrypted = CryptoJS.AES.encrypt(value, SECURE_LOCAL_STORAGE_HASH_KEY).toString()
      localStorage.setItem(key, encrypted);
    },
    removeItem(key) {
      localStorage.removeItem(key);
    }
}

export const useUser = create(
    persist(
        (set) => ({
            mbData: {
                idx: '',
                name: '',
                email: '',
                profile: '',
                isLogin: false
            },
            login: (data) => {
                set({
                    mbData: {
                        idx: data?.idx,
                        name: data?.name,
                        email: data?.email,
                        profile: data?.profile,
                        isLogin: true
                    }
                });
            },
            logout: () => {
                set({
                    mbData: {
                        idx: '',
                        name: '',
                        email: '',
                        profile: '',
                        isLogin: false
                    }
                });
            },
            setMbData: (key, data) => {
                set((state) => ({
                    mbData: {
                        ...state.mbData,
                        [key]: data,
                    },
                }));
            }
        }), 
    )
);


export const useLoading = create((set) => ({
    loading: false,    // 로딩 상태

    // 로딩 시작 / 종료
    startLoading: () => {
        set(() => ({
            loading: true 
        }))
    },
    endLoading: () => {
        set(() => ({ 
            loading: false 
        }));
    },
}));

export const usePopup = create((set) => ({
    open: false,
    title: "",
    message: "",
    button: "",
    buttonCancel: "",
    onCancelPress: null,
    onPress: null,
    component: null,
    className: "",

    openPopup: (payload) => set({ ...payload, open: true }),
    closePopup: () =>
        set({
            open: false,
            title: "",
            message: "",
            button: "",
            buttonCancel: "",
            onCancelPress: null,
            onPress: null,
            component: null,
            className: "",
        }),
}));


export const useGallery = create(
    (set, get) => ({
        open: null,
        
        startIndex: 0,
        list: [],

        openGallery: (state) => {
            set({ 
                open: true, 
                
                startIndex: state?.startIndex || 0,
                list: state?.list || [],
            });
        },
        
        closeGallery: (state) => {
            set({ 
                open: false
            });
        },
    })
)


export const useConfig = create(
    persist(
        (set) => ({
            configOptions: null,

            setConfigOptions: (data) => {
                set({
                    configOptions: data || null
                });
            },
        }), 
        {
            name: 'config', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => EncryptedStorage),
        }
    )
)

export const useLobStore = create((set) => ({
    lobValue: "",
    LobSet: (value) => set({ lobValue: value }),

    PromptNone: false,
    setPromptNone: (value) => set({ PromptNone: value }),
}));

export const useTabStore = create(
    persist(
        (set, get) => ({
            activeTabs: {},

            setTab: (pathname, tab) =>
                set((state) => ({
                    activeTabs: { ...state.activeTabs, [pathname]: tab },
                })),

            getTab: (pathname) => get().activeTabs[pathname] || null,

            clearTab: (pathname) =>
                set((state) => {
                    const newTabs = { ...state.activeTabs };
                    delete newTabs[pathname];
                    return { activeTabs: newTabs };
                }),
        }),
        {
            name: 'tab-storage',
        }
    )
);