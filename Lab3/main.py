import numpy as np
import matplotlib.pyplot as plt

import matplotlib
from mpl_toolkits.mplot3d import Axes3D

from MultidimensionalOptimization import MultidimensionalOptimization

a, b, c, d = 3, -1.2, 0.02, 1.3

func = lambda x: (x[0] - a) ** 2 + (x[1] - b) ** 2 + np.exp(c * x[0] ** 2 + d * x[1])

if __name__ == "__main__":
    x0 = np.array([0, -1], dtype=np.float)  #начальное приближение
    multidimensional_optimization = MultidimensionalOptimization(func=func, x0=x0)

    print("Метод Хука-Дживса: ", multidimensional_optimization.Hook_Jeeves_method(0.1, 0.00005))
    print("Симплекс метод: ", multidimensional_optimization.Simplex_method())
    print("Метод Нельдера: ", multidimensional_optimization.Nelder_method())
    print("Метод градиентного спуска с постоянным шагом: ", multidimensional_optimization.gradient_method_const_step())
    print("Метод градиентного спуска с дроблением шага: ", multidimensional_optimization.gradient_method_crushing_step())
    print("Градиентный метод наискорейшего спуска: ", multidimensional_optimization.gradient_method_steepest_descent())
    print("Метод координатного спуска с постоянным шагом: ", multidimensional_optimization.coordinate_descent_const_step())
    print("Метод Гаусса-Зейделя: ", multidimensional_optimization.Gauss_Seidel_algorithm())
    print("Метод оврагов: ", multidimensional_optimization.ravine_method())
    print("Метод Гельфанда: ", multidimensional_optimization.Gelfand_method4())
