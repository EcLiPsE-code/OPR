/*
[a.b] - исходный отрезок локализации
N - кол-во точек, в которых необходимо провести вычисленяи целевой функции f(x)
 */
function passiveOptimalAlgorithm(N, a, b) {
    let x = [];
    let y = [];
    let k = 0;
    let delta = Math.abs(a - b) / N;
    if (N % 2 === 0){
        k = N / 2;
    }else{
        k = (N - 1) / 2;
    }
    /*
    находим минимальное значение в массиве y
    */
    function getMinValue(...array) {
        return Math.min(array);
    }
    /*
    Заполняет значения массивов x, y
     */
    function setValueFunction(ax, bx) {
        let _x = [];
        let _y = [];
        for (let i = 0; i < N; i++){
            if (N % 2 === 0){
                _x.push(ax + (bx - ax) / (N + 1) * i);
            }else{
                let tmp = ax + (bx - ax) / (k + 1) * i;
                _x.push(tmp - delta);
                _x.push(tmp);
            }
        }
        for (let i = 0; i < _x.length; i++){
            _y.push(getFunction(i));
        }
        return {_x, _y};
    }
    let LN = 0;
    if (N % 2 === 0){
        LN = 2 * (b - a) / (k + 1) + delta;
    }else{
        LN = 2 * (b - a) / (N + 1);
    }
    let eps = LN / 2;
    x = setValueFunction(a, b)._x;
    y = setValueFunction(a, b)._y;

    let min_y = getMinValue(y);
    let j = y.indexOf(min_y);
    let L = x[j + 1] - x[j - 1];

    let exact_min_x = 0;
    let exact_min_y = 0;
    let tmp_x = x;
    let tmp_y = y;
    while(Math.abs(exact_min_y - min_y) > eps){
        tmp_x = setValueFunction(tmp_x[j - 1], tmp_y[j + 1])._x;
        tmp_y = setValueFunction(tmp_x[j - 1], tmp_y[j + 1])._y;
        exact_min_y = Math.min(tmp_y);
        j = tmp_y.indexOf(exact_min_y);
        exact_min_x = tmp_x[j];
    }
    return {exact_min_x, exact_min_y};
}

/*
Метод блочного поиска
[a.b] - исходный отрезок неопределенности
eps - точность приближенного решения
N - число экспериментов в блоке
 */
function blockSearch(N, a, b, eps) {
    /*
    проводим эксперимент в середине отрезка [a,b]
     */
    let k = 2 * N - 1;
    let x_k = (a + b) / 2;
    let y_k = getFunction(x_k);

    let x = [];
    let y = [];

    function getMinValue(...array) {
        return Math.min(array);
    }

    /*
    проводим эксперименты в остальных точках блока
     */
    function setValueFunction(ax, bx) {
        let _y = [];
        let _x = [];
        for (let i = 0; i < N; i++){
            if (i !== k){
                _x.push(ax + i * (bx - ax)/(N + 1));
            }
        }
        for (let i = 0; i < _x.length; i++){
            _y.push(getFunction(_x[i]));
        }
        return {_x, _y};
    }

    x = setValueFunction(a, b)._x;
    y = setValueFunction(a, b)._y;

    /*
    находим точку, в которой достигается минимум среди вычисленных значений
     */
    let min_y = getMinValue(x);
    let j = y.indexOf(min_y);
    let L = x[j + 1] - x[j - 1];

    let exact_a = x[j] - 1;
    let exact_b = x[j] + 1;
    let exact_min_x = 0;
    let exact_min_y = 0;
    let tmp_x = x;
    let tmp_y = y;
    while(Math.abs(exact_a - exact_b) <= 2 * eps){
        tmp_x = setValueFunction(exact_a, exact_b)._x;
        tmp_y = setValueFunction(exact_a, exact_b)._y;
        exact_min_y = getMinValue(tmp_y);
        j = getMinValue(exact_min_y);
        exact_min_x = tmp_x[j];
    }
    return {exact_min_x, exact_min_y};
}

/*
метод золотого сечения
 */
function goldenRatioMethod(a, b, eps){
    let lambda = Math.sqrt(5) / 2;

    let x_1 = a + (1 - lambda) * Math.abs(b - a);
    let x_2 = b - (1 - lambda) * Math.abs(b - a);

    let y_1 = getFunction(x_1);
    let y_2 = getFunction(x_2);

    let exact_x = 0;
    let exact_y = 0;
    while(Math.abs(b - a) > eps){
        if (y_1 <= y_2){
            b = x_2;
            x_2 = x_1;
            y_2 = y_1;

            x_1 = a + (1 - lambda) * Math.abs(b - a);
            y_1 = getFunction(x_1);

            exact_x = x_1;
            exact_y = y_1;
        }else{
            a = x_1;
            x_1 = x_2;
            y_1 = y_2;

            x_2 = b - (1 - lambda) * Math.abs(b - a);
            y_2 = getFunction(x_2);

            exact_x = x_2;
            exact_y = y_2;
        }
    }
    return {exact_x, exact_y};
}

/*
метод фибоначчи
 */
function fibonacciMethod(N, a, b) {

    function getNumberFibonacci(n) {
        let F = [1, 1];
        for (let i = 2; i < n; i++){
            F.push(F[i - 1] + F[i - 2]);
        }
        return F;
    }
    let F = getNumberFibonacci(N);
    let x_1 = a + (b - a) * (F[N - 3] / F[N - 1]);
    let x_2 = a + (b - a) * (F[N - 2] / F[N - 1]);

    let y_1 = getFunction(x_1);
    let y_2 = getFunction(x_2);

    for(let i = 0; i < N - 2; i++){
        if (y_1 <= y_2){
            b = x_2;
            x_2 = x_1;
            y_2 = y_1;

            x_1 = a + b - x_2;
            y_1 = getFunction(x_1);
        }else{
            a = x_1;
            x_1 = x_2;
            y_1 = y_2;

            x_2 = a + b - x_1;
            y_2 = getFunction(x_2);
        }
    }
    if (y_1 < y_2){
        return {x_1, y_1};
    }else{
        return {x_2, y_2};
    }
}
/*
Возвращает функцию
 */
function getFunction(x) {
    return 7 * Math.cos(x) + Math.exp(x + 3);
}
/*
возвращает первую производную
 */
function getDerivativeFunction(x) {
    return Math.exp(x+3) - 7 * Math.sin(x);
}

