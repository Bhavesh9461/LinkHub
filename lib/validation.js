const NAME_MAX_LEN = 20;
const PHONE_MAX_LEN = 10;
const PHONE_REGEX = new RegExp(`^[0-9]{6,${PHONE_MAX_LEN}}$`);
const MESSAGE_MAX_LEN = 500;

export const LIMITS = { NAME_MAX_LEN, PHONE_MAX_LEN, MESSAGE_MAX_LEN };

export function validateContactForm({ name, countryCode, phone, message, preference }) {
  const errors = {};

  const trimmedName = name.trim();
  if (!trimmedName) {
    errors.name = "Enter your name";
  } else if (trimmedName.length < 2) {
    errors.name = "Name is too short";
  } else if (trimmedName.length > NAME_MAX_LEN) {
    errors.name = `Keep it under ${NAME_MAX_LEN} characters`;
  }

  const digitsOnlyPhone = phone.replace(/\D/g, "").slice(0, PHONE_MAX_LEN);
  if (!digitsOnlyPhone) {
    errors.phone = "Enter your number";
  } else if (!PHONE_REGEX.test(digitsOnlyPhone)) {
    errors.phone = `Enter a valid number (up to ${PHONE_MAX_LEN} digits)`;
  }

  if (!countryCode) {
    errors.countryCode = "Select a country code";
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length > MESSAGE_MAX_LEN) {
    errors.message = `Keep it under ${MESSAGE_MAX_LEN} characters`;
  }

  if (!preference) {
    errors.preference = "Choose how you'd like to be reached";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    cleaned: {
      name: trimmedName,
      countryCode,
      phone: digitsOnlyPhone,
      fullPhone: `${countryCode}${digitsOnlyPhone}`,
      message: trimmedMessage,
      preference,
    },
  };
}
