<template>
    <div class="container">
        <form @submit.prevent="submit">
            <div class="field w-auto">
                <label for="title" class="label mb-2 block"></label>
                <div class="control my-2 w-full">
                    <input type="text"
                           id="title"
                           class="input text-center bg-transparent border-muted-light rounded p-2 text-2xl w-full"
                           placeholder="Chapter Title"
                           required
                           v-model="form.title"
                    >
                </div>
            </div>
            <div id="editorjs" class="bg-white rounded shadow-2xl mb-4 py-6 px-4" ref="editor"></div>
            <button ref="saveButton" class="button">Save Chapter</button>
        </form>
    </div>
</template>

<script>
    import EditorJS from '@editorjs/editorjs';
    import Header from '@editorjs/header';
    import List from '@editorjs/list';
    import Embed from '@editorjs/embed';
    import Paragraph from '@editorjs/paragraph';
    import ImageTool from '@editorjs/image';
    import SimpleImage from '@editorjs/simple-image';
    import Quote from '@editorjs/quote';
    import Marker from '@editorjs/marker';
    import CodeTool from '@editorjs/code';
    import LinkTool from '@editorjs/link';
    import Delimiter from '@editorjs/delimiter';
    import InlineCode from '@editorjs/inline-code';
    import RawTool from '@editorjs/raw';
    import Warning from '@editorjs/warning';
    import Table from '@editorjs/table';
    const axios = require('axios');


    let list = document.getElementsByClassName('codex-editor--empty');

    let editor = [];

    export default {
        // props: ['story','body'],
        data(){
            return{
                blocks: [],
                form: {
                    title: ''
                },
            }
        },
        mounted() {
            editor = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: ['link'],
                        config: {
                            placeholder: 'Enter a header',
                            levels: [1, 2, 3, 4, 5, 6],
                            defaultLevel: 3
                        }
                    },
                    list: {
                        class: List,
                        inlineToolbar: ['link','bold']
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                    },
                    embed: {
                        class: Embed,
                        config: {
                            services: {
                                youtube: true
                            }
                        }
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints:{
                                byFile: '/uploadFile',
                                byUrl: '/fetchUrl'
                            }
                        }
                    },
                    simple_image: {
                        class: SimpleImage
                    },
                    quote: {
                        class: Quote,
                        inlineToolbar: true,
                        shortcut: 'CTRL+Q',
                        config: {
                            quotePlaceholder: 'Enter a quote',
                            captionPlaceholder: 'Quote\'s author'
                        }
                    },
                    marker: {
                        class: Marker,
                        shortcut: 'CTRL+M'
                    },
                    code: CodeTool,
                    linkTool:{
                        class: LinkTool,
                        config: {
                            endpoint: '/'
                        }
                    },
                    delimiter: Delimiter,
                    inlineCode: {
                        class: InlineCode,
                        shortcut: 'CTRL+H'
                    },
                    raw: RawTool,
                    warning: {
                        class: Warning,
                        inlineToolbar: true,
                        shortcut: 'CTRL+SHIFT+W',
                        config: {
                            titlePlaceholder: 'Title',
                            messagePlaceholder: 'Message'
                        }
                    },
                    table: {
                        class: Table,
                        inlineToolbar: true,
                        config: {
                            rows: 2,
                            cols: 3,
                        }
                    }
                }
            });
        },
        methods: {
            submit() {
                editor.save().then((outputData) => {
                    let attributes = {
                        'title': this.form.title,
                        'body': JSON.stringify(outputData)
                    }

                    console.log(outputData);
                    console.log(attributes['body']);
                    // axios.post(
                    //     '/stories/' + this.$props.story + '/chapters',
                    //     attributes
                    // ).then(response => {
                    //     editor.destroy();
                    //     location = response.data.message;
                    // });
                });
            }
        }
    }
</script>
