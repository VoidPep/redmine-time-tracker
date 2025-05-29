<template>
  <h2>Configurações redmine</h2>
  <Form @submit="onSubmit" :validation-schema="schema">
    <div class="d-flex flex-column align-items-end justify-content-center gap-3 pt-3">
      <Field name="url" v-slot="{ field, errors }">
        <IftaLabel class="w-100">
          <InputText class="w-100" id="url" v-bind="field" placeholder="http://redmine.url.com.br/"></InputText>
          <label for="url">Url</label>
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

      <button type="submit" class="p-button ms-auto p-component p-button">Salvar</button>
    </div>
  </Form>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {Button, InputText, IftaLabel} from "primevue";
import * as yup from 'yup'
import {Field, Form, useForm} from "vee-validate";
import {useRedmineStore} from "../../composables/useRedmineStore";

const redmineStore = useRedmineStore();
const config = ref({});

const schema = yup.object({
  url: yup.string().url("Url deve ser uma url válida").required('Url é obrigatório'),
  token: yup.string().required('Token é obrigatório')
})

const onSubmit = function (values) {
  redmineStore.salvarConfiguracao(values);
}

onMounted(() => {
  const {setFieldValue} = useForm();

  config.value = redmineStore.carregarConfiguracao();

  if (config.value) {
    setFieldValue('url', config.value.url || '');
    setFieldValue('token', config.value.token || '');
  }
})
</script>