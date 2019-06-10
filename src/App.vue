<template>
  <main class="wrapper">
    <article>
      <canvas id="fabric-canvas"></canvas>
      <el-row class="mt-3">
        <el-tooltip content="To Front">
          <el-button @click="handleClick('toFront')" plain size="medium" icon="el-icon-upload2"></el-button>
        </el-tooltip>
        <el-tooltip content="To Back">
          <el-button @click="handleClick('toBack')" plain size="medium" icon="el-icon-download"></el-button>
        </el-tooltip>
        <el-button
          @click="handleClick('delete')"
          type="danger"
          plain
          size="medium"
          icon="el-icon-delete"
        ></el-button>
      </el-row>
    </article>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Text" name="first">
        <label class="label mt-3">
          ID:
          <span>123</span>
        </label>
        <el-input placeholder="Your Text Here" v-model="selectedText.text" clearable class="mt-3"></el-input>
        <el-row class="mt-3" style="display: flex;">
          <el-select v-model="selectedText.font" placeholder="Select Font" class="mr-3">
            <el-option label="Font 1" value="first_font"></el-option>
            <el-option label="Font 2" value="second_font"></el-option>
          </el-select>
          <el-color-picker v-model="selectedText.color" class="mr-3"></el-color-picker>
          <el-button size="medium" @click="handleAddText" type="primary">Add Text</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Image" name="second">
        <label class="label">
          ID:
          <span>123</span>
        </label>
        <el-row class="mt-3">
          <el-input placeholder="Image URL" clearable>
            <el-button slot="append">Add</el-button>
          </el-input>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Import/Export" name="third">
        <el-input type="textarea" :rows="2" placeholder="SVG"></el-input>
        <el-row class="mt-3">
          <el-button size="medium" type="primary">Export SVG</el-button>
          <el-button size="medium">Import SVG</el-button>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import ElementUI from "element-ui";

Vue.use(ElementUI);

export default Vue.extend({
  data() {
    return {
      activeTab: "first",
      unusedData: "stub",
      selectedText: {
        text: "Default text",
        font: "first_font",
        color: "black"
      }
    };
  },
  methods: {
    setData(payload) {
      if (payload.selectedText) {
        this.selectedText = payload.selectedText;
      }
    },

    handleAddText() {
      this.$emit("addText", this.selectedText);
    },

    handleClick(event: string = "") {
      this.$emit("buttonClick", event);
    }
  }
});
</script>

<style lang="scss" scoped>
//UI common styles
@import url("//unpkg.com/element-ui@2.7.2/lib/theme-chalk/index.css");

//Spacings
$spacer: 16px;

.mt-3 {
  margin-top: $spacer;
}
.mr-3 {
  margin-right: $spacer;
}

//Custom styles
.label {
  font-size: 13px;
}
</style>