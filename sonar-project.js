// eslint-disable-next-line @typescript-eslint/no-var-requires
const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.login': 'admin',
      'sonar.password': '1234',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.inclusions': '**',
      'sonar.exclusions':
        'src/infrastructure/common/interceptors/timeout.interceptors.ts, src/infrastructure/common/apm/apm.service.ts, src/infrastructure/common/apm/apm.interceptor.ts, src/main.ts, src/infrastructure/common/config.ts, src/infrastructure/common.module.ts, src/domain/constData.ts',
      'sonar.test.exclusions': 'src/**/*.spec.ts,src/*.spec.ts',
      'sonar.test.inclusions': 'src/**/*.spec.ts,src/*.spec.ts',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml',
    },
  },
  () => {
    // empty functionm
  },
);
