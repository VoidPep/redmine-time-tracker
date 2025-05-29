<template>
  <div class="d-flex flex-column w-100 align-items-center">
    <div class="d-flex flex-column align-items-center gap-3">
      <InputText placeholder="http://redmine.url.com.br/"></InputText>
      <InputText placeholder="000000000000000000000000000"></InputText>
    </div>

    <Button label="Salvar" class="ms-auto"/>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
// import { zodResolver } from '@primevue/forms/resolvers/zod';
// import { useToast } from "primevue/usetoast";
// import { z } from 'zod';
//
// const toast = useToast();
// const initialValues = ref({
//   username: '',
//   email: ''
// });
//
//
// const onFormSubmit = ({ valid }) => {
//   if (valid) {
//     toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
//   }
// };
import {Button, InputText} from "primevue";
</script>