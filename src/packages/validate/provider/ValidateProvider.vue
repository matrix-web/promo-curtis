<template>
  <ValidationProvider v-bind="$attrs" v-slot="{ errors }">
    <slot :errors="errors" />
  </ValidationProvider>
</template>

<script>
import { extend, ValidationProvider } from "vee-validate";
import {
  email,
  max,
  max_value as maxValue,
  min,
  min_value as minValue,
  numeric,
  required,
  confirmed,
} from "vee-validate/dist/rules";

const kebabCase = {
  validate: (value) => {
    return (
      !/[^a-z0-9-]/g.test(value) && !/^-/g.test(value) && !/-$/g.test(value)
    );
  },
};
const kebabCaseWithUpper = {
  validate: (value) => {
    return (
      !/[^a-zA-Z0-9-]/g.test(value) && !/^-/g.test(value) && !/-$/g.test(value)
    );
  },
};

const password = {
  validate: (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!”№%:@#$%^&*,.;()_+a-zA-Z\d]{8,}$/;
    return regex.test(value);
  },
};

const phone = {
  validate: (value) => {
    const regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/;
    return regex.test(value);
  },
};

const maxDate = {
  validate: (value) => {
    const [day, month, year] = value.split(".");
    const d = new Date(year + "/" + month + "/" + day);
    return +d <= +new Date();
  },
};

const checkbox = {
  validate: (value) => {
    return value;
  },
};

const notEqual = {
  validate: (value, invalidValues) => {
    return !invalidValues.includes(value);
  },
};

const time = {
  validate: (value) => value.length === 5,
};

const date = {
  validate: (value) => {
    const [day, month, year] = value.split(".");
    const d = new Date(year + "/" + month + "/" + day);
    return !isNaN(d.getTime());
  },
};

extend("kebab-case", {
  ...kebabCase,
  message: "Это значение имеет неккоректный формат",
});
extend("kebab-case-with-upper", {
  ...kebabCaseWithUpper,
  message: "Это значение имеет неккоректный формат",
});
extend("required", {
  ...required,
  message: "Это поле обязательное",
});
extend("confirmed", {
  ...confirmed,
  message: (field, params) => `Это поле не равно ${params.target} полю`,
});
extend("numeric", {
  ...numeric,
  message: "Значение должно быть числом",
});
extend("decimal", {
  params: ["decimals"],
  validate: (value, { decimals }) => {
    const regex = new RegExp(
      `^[1-9][0-9]*(\\.[0-9]{1,${decimals}})?$|^0(\\.[0-9]{1,${decimals}})?$`
    );
    return regex.test(value);
  },
  message: (field, params) =>
    `This field must be numeric and may contain ${params.decimals} decimal points`,
});
extend("alpha-num-space-dash-underscore", {
  params: ["decimals"],
  validate: (value) => {
    const regex = /^[a-z0-9_\- ]*$/i;
    return regex.test(value);
  },
  message: () =>
    "This field may only contain alpha-numeric characters, spaces, dashes and underscores",
});
extend("checkbox", {
  ...checkbox,
  message: "Это поле обязательное",
});
extend("email", {
  ...email,
  message: "Неккоректный Email",
});
extend("phone", {
  params: ["len"],
  ...phone,
  message: "Неккоректный телефон",
});
extend("password", {
  ...password,
  message: "Неправильный пароль",
});
extend("maxValue", {
  ...maxValue,
  message: (field, params) => `Значение не может быть больше чем ${params.max}`,
});

extend("max-date", {
  ...maxDate,
  message: () => "Дата не может быть больше чем текущая дата",
});

extend("minValue", {
  ...minValue,
  message: (field, params) => `Значение не может быть меньше чем ${params.min}`,
});
extend("max", {
  ...max,
  message: (field, params) =>
    `Это поле может содержать символов не больше чем ${params.length}`,
});
extend("min", {
  ...min,
  message: (field, params) =>
    `Значение не может быть меньше чем ${params.length} цифр`,
});
extend("not-equal", {
  ...notEqual,
  message: "Введенные значение отличаются",
});
extend("time", {
  ...time,
  message: "Это значение не корректное",
});
extend("date", {
  ...date,
  message: "Это значение не корректное",
});

export default {
  name: "ValidateProvider",
  inheritAttrs: false,
  components: {
    ValidationProvider,
  },
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
