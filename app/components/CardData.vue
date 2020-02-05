<template>
  <StackLayout>
    <!-- Header text -->
    <Label
      text="Tell us a little about the card you received"
      textWrap="true"
      class="header"
    />

    <!-- From -->
    <StackLayout>
      <Label
        text="Who was the card from?"
        class="label"
        :class="{ 'input-error': showErrors && !fromValid }"
      />
      <TextField
        v-model="card.from"
        v-shadow="2"
        hint="Card giver's name"
        returnKeyType="done"
        class="input"
      />
    </StackLayout>

    <!-- Tag type -->
    <StackLayout class="m-t-15">
      <Label
        text="What was the occassion?"
        class="label"
        :class="{ 'input-error': showErrors && !tagValid }"
      />
      <TextField
        v-model="card.tag"
        v-shadow="2"
        hint="Type of card"
        returnKeyType="done"
        class="input"
      />
    </StackLayout>

    <!-- Date -->
    <StackLayout class="m-t-15">
      <Label
        text="When did you receive the card?"
        class="label"
        :class="{ 'input-error': showErrors && !dateValid }"
      />
      <DatePickerField
        :date="card.date"
        @dateChange="args => $emit('dateChange', args.value)"
        hint="Date Received"
        dateFormat="MM/dd/yyyy"
        class="input"
      />
    </StackLayout>

    <!-- Notes -->
    <StackLayout class="m-t-15">
      <Label text="Notes (optional)" class="label" />
      <TextView
        v-model="card.notes"
        v-shadow="2"
        class="input"
        returnKeyType="done"
        height="75%"
      />
    </StackLayout>
  </StackLayout>
</template>

<script>
export default {
  name: 'CardData',
  props: {
    card: Object,
    showErrors: Boolean,
  },
  computed: {
    fromValid() {
      return this.card.from !== '';
    },
    tagValid() {
      return this.card.tag !== '';
    },
    dateValid() {
      return this.card.date !== undefined;
    },
  },
};
</script>
