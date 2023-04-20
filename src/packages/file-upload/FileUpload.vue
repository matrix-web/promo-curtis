<template>
  <div class="file-upload-wrapper">
    <label class="file-upload">
      <div class="file-upload__icon">
        <svg
          v-if="file && !isLoading && isInnerFile"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="16" height="16" rx="8" fill="#FCCA0B" />
          <path d="M4 7.5L8 11.5L11.5 4" stroke="black" />
        </svg>
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1890_4044)">
            <path
              d="M14.6439 1.67626C12.8903 -0.0395509 10.0869 -0.0391777 8.33369 1.67711L0.980778 9.03006C-0.348776 10.391 -0.323367 12.572 1.03753 13.9015C2.37604 15.2092 4.51374 15.2092 5.85225 13.9015L12.5104 7.24335C13.376 6.37777 13.376 4.97436 12.5104 4.10879C11.6449 3.24322 10.2414 3.24322 9.37587 4.10879L3.00717 10.4775C2.78503 10.7075 2.79141 11.074 3.02141 11.2961C3.24579 11.5128 3.60148 11.5128 3.82586 11.2961L10.1945 4.92745C10.6169 4.52287 11.2872 4.53729 11.6917 4.95961C12.0841 5.36917 12.0841 6.01512 11.6917 6.42469L5.03359 13.0828C4.13413 13.9695 2.68614 13.9591 1.79947 13.0597C0.92175 12.1693 0.92175 10.7391 1.79947 9.84872L9.15238 2.49577C10.4621 1.18555 12.586 1.18518 13.8962 2.49489C15.2064 3.80459 15.2068 5.92848 13.8971 7.2387L6.54413 14.5916C6.30126 14.7996 6.27297 15.1651 6.48096 15.408C6.68895 15.6509 7.05445 15.6792 7.29731 15.4712C7.31997 15.4518 7.34107 15.4307 7.36048 15.408L14.7134 8.05505C16.4557 6.2744 16.4246 3.4185 14.6439 1.67626Z"
              fill="#FCCA0B"
            />
          </g>
          <defs>
            <clipPath id="clip0_1890_4044">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <Loader v-if="isLoading" color="orange" />
      <p v-else class="file-upload__text">{{ label }}</p>
      <input
        class="file-upload__field"
        type="file"
        :name="name"
        :multiple="isMultiple"
        @change="handleChange"
      />
    </label>
    <div class="errors" v-if="errorsList.length">
      <p class="errors__error" v-for="error in errorsList" :key="error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import Loader from "@/packages/loader/Loader";

export default {
  name: "FileUpload",
  props: {
    name: {
      type: String,
      default: "file-upload",
    },
    maxSize: {
      type: Number,
      default: 5,
    },
    label: {
      type: String,
      default: "Выберите файл",
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: Array,
      default: () => [".pdf", ".jpg", ".jpeg", ".png"],
    },
    isFile: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: false,
      errorsList: [],
      files: [],
      file: null,
      isInnerFile: false,
    };
  },
  methods: {
    handleChange(event) {
      this.errorsList = [];
      const files = event.target.files;
      const reader = new FileReader();

      if (files && files.length) {
        if (this.isFileValid(files[0]) && !this.isMultiple) {
          reader.readAsDataURL(files[0]);
          this.isLoading = true;

          reader.addEventListener("load", () => {
            this.isLoading = false;
            this.file = files[0];
            this.isInnerFile = true;
            this.$emit("upload", this.file);
          });
        }
      }
    },
    isFileSizeValid(fileSize) {
      if (fileSize >= this.maxSize) {
        console.log("error pushed");
        this.errorsList.push(`Файл должен быть меньше чем ${this.maxSize} MB`);
      }
    },
    isFileTypeValid(fileExtention) {
      if (!this.accept.map((ext) => ext.substring(1)).includes(fileExtention)) {
        this.errorsList.push(`Тип файла должен быть ${this.accept.join(",")}`);
      }
    },
    isFileValid(file) {
      this.isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100);
      this.isFileTypeValid(file.name.split(".").pop());

      return !this.errorsList.length;
    },
  },
  mounted() {
    this.isInnerFile = this.isFile;
  },
  watch: {
    isFile() {
      this.isInnerFile = this.isFile;
    },
  },
};
</script>

<style lang="scss" scoped>
.file-upload {
  display: flex;
  cursor: pointer;

  &__icon {
    margin-right: 8px;
  }

  &__field {
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    z-index: -1;
  }

  &__text {
    font-family: var(--font-regular);
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-decoration-line: underline;
    color: var(--color-white);
  }
}

.errors {
  display: flex;
  flex-direction: column;

  &__error {
    color: var(--color-red);
    font-size: 10px;
    font-weight: 400;
    margin-left: 2px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
