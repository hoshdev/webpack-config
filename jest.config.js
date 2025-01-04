module.exports = {
  preset: "ts-jest", // Usa el preset para TypeScript
  testEnvironment: "jsdom", // Usa el entorno jsdom para pruebas en React
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock para estilos
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Configuración adicional de Jest
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transforma TypeScript
    "^.+\\.jsx?$": "babel-jest", // Transforma JavaScript
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
