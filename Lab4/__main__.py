import sys

import numpy as np
from lab4 import LinearOptimization

func = lambda x: 2*x[0] + x[1] + x[2] + чx[3]

if __name__ == "__main__":
    x1, x2, x3, x4 = 2, 1, 1, 1  #значения коэфф. целевой функции
    b1, b2, b3, b4 = 0, 1, 0, 1   #базисный план
    condition1 = [1, 2, 2, 1, 2]  #граничные усл.
    condition2 = [1, 0, -1, 1, 1]

    line_opt = LinearOptimization(
        np.array([x1, x2, x3, x4]),
        np.array([b1, b2, b3, b4])
    )
    line_opt.add_condition(condition1)
    line_opt.add_condition(condition2)

    simplex_table = line_opt._get_matrix_table()
    print(" Начальная симплекс-таблица")
    for i in simplex_table:
        print(i)
    result, result_simplex_table = line_opt.optimize()

    print("Значение x1: {0}, Значение x2: {1}, Значение x3: {2}, Значение x4: {3}, z: {4}".format(result[0], result[1], result[2], result[3], func(result)))
