import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    fonts: {
        heading: '"Zen Maru Gothic", sans-serif',
        body: '"Zen Maru Gothic", sans-serif',
    },
    styles: {
        global: {
            body: {
                bg: 'blue.50',
                color: 'gray.800',
            },
            // フリガナのスタイル
            ruby: {
                fontFamily: '"Zen Maru Gothic", sans-serif',
            },
            rt: {
                fontSize: '0.6em',
                color: 'gray.600',
                userSelect: 'none', // フリガナは選択不可にしておくと邪魔にならない
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold',
                borderRadius: 'xl',
            },
            variants: {
                solid: {
                    // 少し立体的あるいはポップな影をつけるなどをここで定義できる
                },
            },
        },
        // カード風のコンポーネント用
        Card: {
            baseStyle: {
                container: {
                    borderRadius: 'xl',
                    boxShadow: 'md',
                },
            },
        },
    },
});

export default theme;
