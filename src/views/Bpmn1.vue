<template>
  <div class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
    <ul class="buttons">
      <li>
        <input type="file" @change="uploadBpmn" id="btn_file">
      </li>
      <li>下载</li>
      <li>
        <a ref="saveDiagram" href="javascript:" title="download BPMN diagram">BPMN diagram</a>
      </li>
      <li>
        <a ref="saveSvg" href="javascript:" title="download as SVG image">SVG image</a>
      </li>
    </ul>
  </div>
</template>
<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

import customTranslate from '../utils/customTranslate/customTranslate'
import axios from 'axios'
 
export default {
  data () {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: null,
      processName: '',
      fileList: []
    }
  },
  watch: {
    fileList(val) {
      console.log(this.fileList)
    }
  },
  methods: {
    async uploadBpmn(e) {
      var file = document.getElementById('btn_file').files[0];
      var URL = window.URL || window.webkitURL;
      var imgURL = URL.createObjectURL(file);
      // 发送请求
      axios.get(imgURL).then((response) => {
        this.createNewDiagram(response.data)
      });
    },
    createNewDiagram (xmlDoc) {
      const bpmnXmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
        '  <bpmn2:process id="Process_1" isExecutable="false">\n' +
        '    <bpmn2:startEvent id="StartEvent_1"/>\n' +
        '  </bpmn2:process>\n' +
        '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
        '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
        '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
        '        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>\n' +
        '      </bpmndi:BPMNShape>\n' +
        '    </bpmndi:BPMNPlane>\n' +
        '  </bpmndi:BPMNDiagram>\n' +
        '</bpmn2:definitions>'
//       const bpmnXmlStr = `<?xml version="1.0" encoding="UTF-8"?>
// <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
//   <bpmn2:process id="Process_1" isExecutable="false">
//     <bpmn2:startEvent id="StartEvent_1">
//       <bpmn2:outgoing>Flow_1tphzzl</bpmn2:outgoing>
//     </bpmn2:startEvent>
//     <bpmn2:exclusiveGateway id="Gateway_0gbw9f0">
//       <bpmn2:incoming>Flow_1tphzzl</bpmn2:incoming>
//       <bpmn2:outgoing>Flow_04zmtgd</bpmn2:outgoing>
//     </bpmn2:exclusiveGateway>
//     <bpmn2:sequenceFlow id="Flow_1tphzzl" sourceRef="StartEvent_1" targetRef="Gateway_0gbw9f0" />
//     <bpmn2:task id="Activity_1qczkto">
//       <bpmn2:incoming>Flow_04zmtgd</bpmn2:incoming>
//     </bpmn2:task>
//     <bpmn2:sequenceFlow id="Flow_04zmtgd" sourceRef="Gateway_0gbw9f0" targetRef="Activity_1qczkto" />
//   </bpmn2:process>
//   <bpmndi:BPMNDiagram id="BPMNDiagram_1">
//     <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
//       <bpmndi:BPMNEdge id="Flow_1tphzzl_di" bpmnElement="Flow_1tphzzl">
//         <di:waypoint x="448" y="180" />
//         <di:waypoint x="545" y="180" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_04zmtgd_di" bpmnElement="Flow_04zmtgd">
//         <di:waypoint x="570" y="205" />
//         <di:waypoint x="570" y="280" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
//         <dc:Bounds x="412" y="162" width="36" height="36" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="Gateway_0gbw9f0_di" bpmnElement="Gateway_0gbw9f0" isMarkerVisible="true">
//         <dc:Bounds x="545" y="155" width="50" height="50" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="Activity_1qczkto_di" bpmnElement="Activity_1qczkto">
//         <dc:Bounds x="520" y="280" width="100" height="80" />
//       </bpmndi:BPMNShape>
//     </bpmndi:BPMNPlane>
//   </bpmndi:BPMNDiagram>
// </bpmn2:definitions>`
      let bpmnDoc;
      if (typeof xmlDoc == 'string') {
        bpmnDoc = xmlDoc
      } else {
        bpmnDoc = bpmnXmlStr
      }
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnDoc, function (err) {
        if (err) {
          console.error(err)
        }
      })
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG (done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done)
    },
    // 下载为bpmn格式,done是个函数，调用的时候传入的
    saveDiagram (done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
        // console.log(xml) 发送ajax请求
        done(err, xml)
      })
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded (link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data)
      // 获取到图的xml，保存就是把这个xml提交给后台
      this.xmlStr = data
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      if (data) {
        link.className = 'active'
        link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
        link.download = name
      }
    }
  },
  mounted () {
    // 汉化
    let customTranslateModule = {
      translate: [ 'value', customTranslate ]
    };
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas
 
    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 添加控制板
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        // 左边工具栏以及节点
        propertiesProviderModule,
        // 右边的工具栏
        propertiesPanelModule,
        // 汉化
        customTranslateModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    })
 
    // 下载画图
    let _this = this
    // 获取a标签dom节点
    const downloadLink = this.$refs.saveDiagram
    const downloadSvgLink = this.$refs.saveSvg
    // 给图绑定事件，当图有发生改变就会触发这个事件
    this.bpmnModeler.on('commandStack.changed', function () {
      _this.saveSVG(function (err, svg) {
        _this.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg)
      })
 
      _this.saveDiagram(function (err, xml) {
        _this.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
      })
    })
 
    this.createNewDiagram(this.bpmnModeler)
  }
}
</script>
<style lang="scss" scoped>
 
  .containers{
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 90%;
  }
  .canvas{
    width: 100%;
    height: 100%;
  }
  .panel{
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
  }
  .buttons{
    position: absolute;
    left: 20px;
    bottom: 20px;
    &>li{
      display:inline-block;margin: 5px;
      &>a{
        color: #999;
        background: #eee;
        cursor: not-allowed;
        padding: 8px;
        border: 1px solid #ccc;
        &.active{
          color: #333;
          background: #fff;
          cursor: pointer;
        }
      }
    }
  }
</style>