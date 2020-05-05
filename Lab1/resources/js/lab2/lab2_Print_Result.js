function printFirstAlgorithm() {
    let N = parseInt(document.getElementById('enterN_Input').value);
    let a = parseInt(document.getElementById('enterA_Input').value);
    let b = parseInt(document.getElementById('enterB_input').value);

    let x_min = passiveOptimalAlgorithm(N, a, b).exact_min_x;
    let y_min = passiveOptimalAlgorithm(N, a, b).exact_min_y;

    document.getElementById('coordinateX__passiveOptionalAlgorithm').value = x_min;
    document.getElementById('coordinateY__passiveOptionalAlgorithm').value = y_min;
}

function printSecondAlgorithm() {
    let N = parseInt(document.getElementById('enterN_Input_blockSearch').value);
    let a = parseInt(document.getElementById('enterA_Input_blockSearch').value);
    let b = parseInt(document.getElementById('enterB_input_blockSearch').value);
    let eps = parseFloat(document.getElementById('enterEps_input_blockSearch').value);

    let x_min = blockSearch(N, a, b, eps).exact_min_x;
    let y_min = blockSearch(N, a, b, eps).exact_min_y;

    document.getElementById('coordinateX__blockSearchAlgorithm').value = x_min;
    document.getElementById('coordinateY__blockSearchAlgorithm').value = y_min;
}

function printThirdAlgorithm() {
    let a = parseInt(document.getElementById('enterA_Input_goldenRatioMethod').value);
    let b = parseInt(document.getElementById('enterB_input_goldenRatioMethod').value);
    let eps = parseInt(document.getElementById('enterEps_input_goldenRatioMethod').value);

    let x_min = goldenRatioMethod(a, b, eps);
    let y_min = goldenRatioMethod(a, b, eps);

    document.getElementById('coordinateX__goldenRatioMethod').value = x_min;
    document.getElementById('coordinateY__goldenRatioMethod').value = y_min;
}

function printFourthAlgorithm() {

}