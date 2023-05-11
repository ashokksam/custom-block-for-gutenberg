/**
 * Importing registerBlocktype from wp.blocks
 */
const { registerBlockType } = wp.blocks;

const {
    RichText,
    InspectorControls,
    ColorPalette,
    MediaUpload,
    InnerBlocks,
} = wp.editor; // wp.blockEditor

const {
    PanelBody,
    IconButton, // will be remove in 6.2 version of wordpress
    Button,
    RangeControl,
} = wp.components;

/*
List of ALLOWED_BLOCKS:
'core/paragraph',
'core/list',
'core/image',
'core/buttons',
'core/quote',
'core/search',
'core/shortcode',
'core/image',
'core/gallery',
'core/heading',
'core/quote',
'core/embed',
'core/list',
'core/separator',
'core/more',
'core/button',
'core/pullquote',
'core/table',
'core/preformatted',
'core/code',
'core/html',
'core/freeform',
'core/latest-posts',
'core/categories',
'core/cover-image',
'core/text-columns',
'core/verse',
'core/video',
'core/audio',
'core/block',
'core/paragraph',
'core-embed/twitter',
'core-embed/youtube',
'core-embed/facebook',
'core-embed/instagram',
'core-embed/wordpress',
'core-embed/soundcloud',
'core-embed/spotify',
'core-embed/flickr',
'core-embed/vimeo',
'core-embed/animoto',
'core-embed/cloudup',
'core-embed/collegehumor',
'core-embed/dailymotion',
'core-embed/funnyordie',
'core-embed/hulu',
'core-embed/imgur',
'core-embed/issuu',
'core-embed/kickstarter',
'core-embed/meetup-com',
'core-embed/mixcloud',
'core-embed/photobucket',
'core-embed/polldaddy',
'core-embed/reddit',
'core-embed/reverbnation',
'core-embed/screencast',
'core-embed/scribd',
'core-embed/slideshare',
'core-embed/smugmug',
'core-embed/speaker',
'core-embed/ted',
'core-embed/tumblr',
'core-embed/videopress',
'core-embed/wordpress-tv',
'core/calendar',
'core/legacy-widget',
'core/rss',
'core/tag-cloud',
'core/latest-comments',
'core/archives',
'woocommerce/handpicked-products',
'woocommerce/featured-product',
'woocommerce/product-best-sellers',
'woocommerce/product-category',
'woocommerce/product-new',
'woocommerce/product-on-sale',
'woocommerce/product-top-rated',
'woocommerce/products-by-attribute',
'jetpack/rating-star',
'woocommerce/rating-filter',
'core/media-text',
*/

/**
 * 
 * see above listing to add more wordpress core blocks,
 * copy-paste any core/optionName into the below array,
 * 
 */
const ALLOWED_BLOCKS = ['core/button', 'core/image', 'core/media-text', 'jetpack/rating-star'];


/**
 * 
 * Registering Custom Block Type
 * registerBlockType('namespace/block-name'),
 * built-in attributes: title, description, icon, category('comman', 'layout' etc),
 * you can make your Custom Attributes, Fields and Edit or Save them-
 * -using Built-in Functions
 * 
 */

registerBlockType('avlabs/avlabs-custom-block', {
    // built-in attributes
    title: 'Avlabs Block',
    description: 'Block to generate a custom block',
    icon: 'format-image',
    category: 'common',

    // custom attributes
    attributes: {
        heading: {
            type: 'string',
            source: 'html',
            // selector: 'h2'
        },

        body: {
            type: 'string',
            source: 'html',
            selector: 'p'
        },

        titleColor: {
            tyoe: 'string',
            source: 'html',
        },

        backgroundImage: {
            type: 'string',
            source: 'html',
            default: null,
        },

        overlayColor: {
            type: 'string',
            source: 'html',
            default: 'black',
        },

        overlayOpacity: {
            type: 'number',
            source: 'html',
            default: 0.3
        },

        shortDescription: {
            type: 'string',
            source: 'html',
            selector: ".product-short-description",
        },

        divImage: {
            type: 'string',
            source: 'html',
        }

    },

    // built-in functions
    edit: ({ attributes, setAttributes }) => {

        const {
            heading,
            body,
            titleColor,
            backgroundImage,
            overlayColor,
            overlayOpacity,
            divImage,
            shortDescription

        } = attributes;
        console.log(attributes);

        // custom functions

        function onChangeTitle(newTitle) {
            console.log(newTitle);
            setAttributes({ heading: newTitle });
        }

        function onChangeBody(newBody) {
            setAttributes({ body: newBody });
        }

        function onTitleColorChange(newColor) {
            setAttributes({ titleColor: newColor });
        }

        function onSelectImage(newImage) {
            setAttributes({ backgroundImage: newImage.sizes.full.url });
        }

        function onSelectImageDiv(newImage) {
            setAttributes({ divImage: newImage.sizes.full.url });
        }

        function onOverlayColorChange(newColor) {
            setAttributes({ overlayColor: newColor });
        }

        function onOverlayOpacityChange(newOpacity) {
            setAttributes({ overlayOpacity: newOpacity });
        }

        function onChangeRating(newRating) {
            setAttributes({ shortDescription: newRating })
        }

        return ([
            wp.element.createElement(
                InspectorControls,
                { style: { marginBottom: '40px' } },
                wp.element.createElement(
                    PanelBody,
                    { title: 'Font Color Settings' },
                    wp.element.createElement(
                        'p',
                        null,
                        wp.element.createElement(
                            'strong',
                            null,
                            'Select a Title Color'
                        ),
                    ),
                    wp.element.createElement(
                        ColorPalette,
                        {
                            tagName: "input",
                            type: "color",
                            value: titleColor,
                            onChange: onTitleColorChange
                        }
                    ),
                    wp.element.createElement(
                        InnerBlocks,
                        {
                            allowedBlocks: ALLOWED_BLOCKS
                        }
                    ),

                ),
                wp.element.createElement(
                    PanelBody,
                    { title: 'Background Image Settings' },
                    wp.element.createElement(
                        'p',
                        null,
                        wp.element.createElement(
                            'strong',
                            null,
                            'Select a Background Image'
                        ),
                    ),
                    wp.element.createElement(
                        MediaUpload,
                        {
                            type: "image",
                            onSelect: onSelectImage,
                            value: backgroundImage,
                            render: ({ open }) => {
                                return wp.element.createElement(
                                    Button, {
                                    onClick: open,
                                    icon: "upload",
                                    className: "editor-media-placeholder__button is-button is-default is-large",
                                },
                                    "Background Image",
                                );
                            }
                        },

                    ),
                    wp.element.createElement(
                        "div",
                        {
                            style: {
                                marginTop: '20px',
                                marginBottom: '40px',
                            }
                        },
                        wp.element.createElement(
                            "p",
                            null,
                            wp.element.createElement(
                                "strong",
                                null,
                                "Overlay Color",
                            ),
                        ),
                        wp.element.createElement(
                            ColorPalette,
                            {
                                tagName: "input",
                                type: "color",
                                value: overlayColor,
                                onChange: onOverlayColorChange
                            }
                        )
                    ),
                    wp.element.createElement(
                        RangeControl,
                        {
                            label: 'Overlay Opacity',
                            value: overlayOpacity,
                            onChange: onOverlayOpacityChange,
                            min: 0,
                            max: 1,
                            step: 0.01,
                        }
                    ),
                    ALLOWED_BLOCKS.forEach(function (index) {
                        wp.element.createElement(
                            InnerBlocks,
                            {
                                allowedBlocks: ALLOWED_BLOCKS[index],
                            }
                        )
                    }),
                ),
            ),
            wp.element.createElement(
                'div',
                {

                    style: {
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative",
                    }
                },
                // wp.element.createElement(
                //     "div",
                //     {
                //         className: "block-overlay",
                //         style: {
                //             background: overlayColor,
                //             opacity: overlayOpacity,
                //         }
                //     }
                // ),
                wp.element.createElement(
                    "div",
                    null,
                    wp.element.createElement(
                        RichText,
                        {
                            key: 'editable',
                            tagName: "h2",
                            placeholder: 'Your Page Title',
                            value: heading,
                            onChange: onChangeTitle,
                            style: { color: titleColor }
                        }
                    ),
                    wp.element.createElement(
                        RichText,
                        {
                            key: 'editable',
                            tagName: "p",
                            placeholder: 'Your Page Description',
                            value: body,
                            onChange: onChangeBody,
                        }
                    ),
                    wp.element.createElement(
                        RichText,
                        {
                            key: 'editable',
                            tagName: "h4",
                            className: "product-short-description",
                            placeholder: 'Your Product Short Description',
                            value: shortDescription,
                            onChange: onChangeRating,
                        }
                    ),
                    wp.element.createElement(
                        InnerBlocks,
                        {
                            allowedBlocks: ALLOWED_BLOCKS,
                        }
                    ),
                ),
            ),
            wp.element.createElement(
                MediaUpload,
                {
                    type: "image",
                    onSelect: onSelectImageDiv,
                    value: divImage,
                    render: ({ open }) => {
                        return wp.element.createElement(
                            Button, {
                            onClick: open,
                            icon: "upload",
                            className: "editor-media-placeholder__button is-button is-default is-large",

                        },
                            "Upload Image",
                        );
                    }
                },
            ),
            wp.element.createElement(
                "div",
                null,
                wp.element.createElement(
                    'img',
                    {
                        src: divImage,
                    }
                )
            ),
        ]);
    },


    save: ({ attributes }) => {

        const {
            heading,
            body,
            titleColor,
            backgroundImage,
            overlayColor,
            overlayOpacity,
            divImage,
            shortDescription,

        } = attributes;

        return (
            wp.element.createElement(
                'div',
                {
                    style: {
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: "relative",
                    }
                },
                // wp.element.createElement(
                //     "div",
                //     {
                //         className: "block-overlay",
                //         style: {
                //             background: overlayColor,
                //             opacity: overlayOpacity,
                //         }
                //     }
                // ),
                wp.element.createElement(
                    "div",
                    wp.element.createElement(
                        RichText.Content,
                        {
                            tagName: "h2",
                            value: heading,
                            style: { color: titleColor },
                        }
                    ),
                    wp.element.createElement(
                        RichText.Content,
                        {
                            tagName: "p",
                            value: body,
                        }
                    ),
                    wp.element.createElement(
                        RichText.Content,
                        {
                            tagName: "h4",
                            value: shortDescription
                        }
                    ),
                    wp.element.createElement(
                        InnerBlocks.Content,
                    ),
                ),
                wp.element.createElement(
                    "div",
                    null,
                    wp.element.createElement(
                        'img',
                        {
                            src: divImage,
                        }
                    )
                ),
            )
        );
    }
}); 