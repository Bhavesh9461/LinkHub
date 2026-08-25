import toast from "react-hot-toast";

export async function copyToClipboard(value, label = "Copied") {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
    } else {
      // Fallback for non-secure contexts / older browsers
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    toast.success(`${label} copied`);
    return true;
  } catch (err) {
    toast.error("Couldn't copy — try again");
    return false;
  }
}
