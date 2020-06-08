from PyQt5 import QtWidgetsfrom mainWondow import Ui_MainWindowimport numpy as npimport sysimport matplotlib.pylab as pltimport unconditional_optimizate as UnconditionalOptimizate#func = lambda x: np.fabs(x) + np.exp(10*x)#dfunc = lambda x: 10*np.exp(10*x) + 1func = lambda x: 7 * np.cos(x) + np.exp(x + 3)dfunc = lambda x: np.exp(x + 3) - 7 * np.sin(x)class GuiApp(QtWidgets.QMainWindow):    def __init__(self):        super(GuiApp, self).__init__()        self.ui = Ui_MainWindow()        self.ui.setupUi(self)        self.ui.Calculate.clicked.connect(lambda: self.calculate())        self.ui.pushButton.clicked.connect(lambda: self.createGraphic())        self.ui.lineEditA.setText("-30")        self.ui.lineEditB.setText("30")        self.ui.lineEditEps.setText("0.001")        self.ui.lineEditN.setText("80")        self.ui.lineEdit_11.setText("-1")    def calculate(self):        func_analytics = UnconditionalOptimizate.FuncAnalytics(int(self.ui.lineEditA.text()), int(self.ui.lineEditB.text()),                                                               float(self.ui.lineEditEps.text()),                                                               int(self.ui.lineEditN.text()), func, dfunc)        self.ui.lineEdit.setText(str(func_analytics.passive_algorithm()[0]))        self.ui.lineEdit_2.setText(str(func_analytics.passive_algorithm()[1]))        self.ui.lineEdit_3.setText(str(func_analytics.blockSearch()[0]))        self.ui.lineEdit_4.setText(str(func_analytics.blockSearch()[1]))        self.ui.lineEdit_5.setText(str(func_analytics.goldenRationMethod()[0]))        self.ui.lineEdit_6.setText(str(func_analytics.goldenRationMethod()[1]))        self.ui.lineEdit_7.setText(str(func_analytics.fibonacciMethod()[0]))        self.ui.lineEdit_8.setText(str(func_analytics.fibonacciMethod()[1]))        self.ui.lineEdit_9.setText(str(func_analytics.cubicInterpolationMethod(float(self.ui.lineEdit_11.text()))[0]))        self.ui.lineEdit_10.setText(str(func_analytics.cubicInterpolationMethod(float(self.ui.lineEdit_11.text()))[1]))        self.createGraphic()    def createGraphic(self):        func_analytics = UnconditionalOptimizate.FuncAnalytics(int(self.ui.lineEditA.text()),                                                               int(self.ui.lineEditB.text()),                                                               float(self.ui.lineEditEps.text()),                                                               int(self.ui.lineEditN.text()), func, dfunc)        x, y = func_analytics.get_func_value()        plt.title("График функции y = 7cos(x) + exp(x+3)")        plt.xlabel('X')        plt.ylabel('Y')        plt.ylim([-100, 100])        plt.grid()        plt.plot(y)        plt.show()if __name__ == '__main__':    app = QtWidgets.QApplication([])    application = GuiApp()    application.show()    sys.exit(app.exec())