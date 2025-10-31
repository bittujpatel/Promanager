// Simple test runner
function test(name, fn) {
    console.log(`Running test: ${name}`);
    try {
        fn();
        console.log(`%c✔ Test passed`, 'color: green');
    } catch (error) {
        console.error(`%c✖ Test failed`, 'color: red', error);
    }
}

test('unassignLaborer correctly decrements totalDaysWorked and totalEarnings', () => {
    // Setup
    appState.laborers = [{ id: 1, name: 'Test Laborer', dailyRate: 100, totalDaysWorked: 1, totalEarnings: 100, status: 'Active' }];
    appState.attendance = {
        '2024-01-01': {
            '1': [{ laborerId: 1, employmentType: 'normal' }]
        }
    };
    appState.currentDate = '2024-01-01';

    // Act
    unassignLaborer(1);

    // Assert
    const laborer = appState.laborers[0];
    if (laborer.totalDaysWorked !== 0) {
        throw new Error(`Expected totalDaysWorked to be 0, but got ${laborer.totalDaysWorked}`);
    }
    if (laborer.totalEarnings !== 0) {
        throw new Error(`Expected totalEarnings to be 0, but got ${laborer.totalEarnings}`);
    }
});
