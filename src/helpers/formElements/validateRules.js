import ruleCalculated from "./rules/ruleCalculated";
import ruleDependsOn from "./rules/ruleDependsOn";
import ruleShowOn from "./rules/ruleShowOn";

/**
 * @param {object} config - JSON de configuracion del formulario
 * @param {string} origin - Propiedad del JSON que se usa en el RenderForm
 * @param {object} info - Objeto con los valores del formulario
 * @param {function} setConfig - funcion setState del estado config
 * @param {object} options - JSON de opciones para los selects
 * @returns {object} Objeto info con las reglas aplicadas
 */

export const validateRulesForm = (
  config,
  origin,
  info,
  // eslint-disable-next-line no-empty-function
  setConfig = () => {},
  options = [],
) => {
  const infoActualizado = { ...info };

  for (const key in config) {
    const field = config[key];
    const rules = field.rules || {};
    const ruleNames = Object.keys(rules);
    const ruleName = ruleNames[0];

    switch (ruleName) {
      case "calculated":
        // Regla de cálculo de un campo basado en otros
        ruleCalculated(key, rules.calculated, infoActualizado);
        break;
      case "dependsOn":
        // Regla de dependencia directa de un campo sobre otro
        ruleDependsOn(key, rules.dependsOn, infoActualizado, options);
        break;
      case "showOn":
        // Regla de visualizacion de campos en funcion a la opcion seleccionada en otro campo
        ruleShowOn(
          config,
          setConfig,
          origin,
          key,
          rules.showOn,
          infoActualizado,
        );
        break;
      default:
        break;
    }
  }

  return infoActualizado;
};
