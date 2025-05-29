<template>
  <h2>Configurações redmine</h2>

  <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="initialValues"
      :key="formKey"
  >
    <div class="d-flex flex-column align-items-end justify-content-center gap-3 pt-3">
      <Field name="host" v-slot="{ field, errors }">
        <IftaLabel class="w-100">
          <InputText class="w-100" id="host" v-bind="field" placeholder="192.168.X.XXX"></InputText>
          <label for="host">Endereço do servidor redmine</label>
        </IftaLabel>
        <small class="p-error" v-if="errors[0]">{{ errors[0] }}</small>
      </Field>
      <Field name="token" v-slot="{ field, errors }">
        <IftaLabel class="w-100">
          <InputText id="token" class="w-100" v-bind="field" placeholder="000000000000000000000000000"></InputText>
          <label for="token">Token</label>
        </IftaLabel>
        <small class="p-error" v-if="errors[0]">{{ errors[0] }}</small>
      </Field>
      <Field name="username" v-slot="{ field, errors }">
        <IftaLabel class="w-100">
          <InputText id="username" class="w-100" v-bind="field" placeholder="redmine"></InputText>
          <label for="username">Username</label>
        </IftaLabel>
        <small class="p-error" v-if="errors[0]">{{ errors[0] }}</small>
      </Field>
      <Field name="password" v-slot="{ field, errors }">
        <IftaLabel class="w-100">
          <InputText id="password" class="w-100" v-bind="field" placeholder="*******"></InputText>
          <label for="password">Senha</label>
        </IftaLabel>
        <small class="p-error" v-if="errors[0]">{{ errors[0] }}</small>
      </Field>
      <Field name="database" v-slot="{ field, errors }">
        <IftaLabel class="w-100">
          <InputText id="database" class="w-100" v-bind="field" placeholder="redmine"></InputText>
          <label for="database">Banco de dados</label>
        </IftaLabel>
        <small class="p-error" v-if="errors[0]">{{ errors[0] }}</small>
      </Field>

      <Button type="submit" class="ms-auto p-component p-button">Salvar</Button>
    </div>
  </Form>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {Button, IftaLabel, InputText} from "primevue";
import * as yup from 'yup'
import {Field, Form} from "vee-validate";
import {useRedmineStore} from "../composables/useRedmineStore";

const redmineStore = useRedmineStore();
const formKey = ref(0);

const initialValues = ref({
  host: '',
  username: "",
  database: "",
  password: "",
  token: ''
});

const schema = yup.object({
  host: yup.string().required('Host é obrigatório'),
  username: yup.string().required('Usuário é obrigatório'),
  database: yup.string().required('Banco é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
  token: yup.string().required('Token é obrigatório')
})

const onSubmit = function (values) {
  redmineStore.salvarConfiguracao(values);

}

onMounted(async () => {
  const config = await redmineStore.carregarConfiguracao();
  if (config) {
    initialValues.value = {
      host: config.host ?? '',
      token: config.token ?? '',
      username: config.username ?? "",
      database: config.database ?? "",
      password: config.password ?? "",
    };
    formKey.value++;
  }
})
</script>