import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#888BE2',
            main: '#555ACF',
            dark: '#2D32AC',
            // contrastText: 这将计算与 palette.primary.main 的对比度
        },
        secondary: {
            light: '#AFD7E1',
            main: '#54B3BF',
            dark: '#0096B7',
            // contrastText: '#ffcc00',
        },
        error: {
            bg: '#FED4D6',
            main: '#EB6666',
            dark: '#C30052',
        },
        bg: {
            body: '#FFFFFF',
            dark: '#4E4E4F',
            input: '#F6F6F6',
        },
        // 使用 `getContrastText()` 来最大化
        // 背景和文本的对比度
        contrastThreshold: 3,
        // 使用下面的函数用于将颜色的亮度在其调色板中
        // 移动大约两个指数。
        // 例如，从红色 500（Red 500）切换到 红色 300（Red 300）或 红色 700（Red 700）。
        tonalOffset: 0.2,
    },
});

export default theme;
