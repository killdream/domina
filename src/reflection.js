/// reflection.js --- Provides information about nodes.
//
// Copyright (c) 2012 Quildreen Motta
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/// Module moros.dom.reflection


//// - Aliases ----------------------------------------------------------------
var _ = require('./util')



//// - Feature detection ------------------------------------------------------
var TEXT
void function() {
  var Element = document.createElement('div')

  // Check what kind of plain text representation of an Element is
  // supported by the platform. `innerText` is the de-facto standard,
  // and implemented everywhere. Mozilla still goes *only* for the
  // de-juri `textContent`.
  TEXT = 'innerText' in Element?            'innerText'
       : /* likely Gecko-based browsers */  'textContent'
}()



//// - Node introspection -----------------------------------------------------

///// Function attributes
// Returns the attributes set for an `Element'.
//
// attributes :: [Element] -> [[Attribute]]
function attributes(xs) {
  return _.map(xs, function(node){ return _.slice(node.attributes) })}


///// Function attribute
// Returns the value of the attribute with the given `key'.
//
// attribute :: [Element], String -> [Maybe String]
function attribute(xs, key) {
  return _.map(xs, function(node) { var value = node.getAttribute(key)
                                    return value == null?   void value
                                    :      /* otherwise */  value      })}


///// Function attribute_set
// Changes the value of the attribute for the given `key'.
//
// If the given value is `nil', the attribute is removed instead.
//
// attribute_set! :: element:[Element]*, String, String? -> element
function attribute_set(xs, key, value) {
  _.each(xs, function(node){ value == null?   node.removeAttribute(key)
                           : /* otherwise */  node.setAttribute(key, value) })

  return xs }


///// Function text
// Returns the content of the node as plain text, with HTML tags
// stripped.
//
// text :: [Element] -> String
function text(xs) {
  return _.map(xs, function(node){ return node[TEXT] })}


///// Function text_set
// Changes the content of the node to hold a single text node with the
// given value.
//
// text_set! :: element:[Element]*, String -> element
function text_set(xs, value) {
  _.each(xs, function(node){ node[TEXT] = value })
  return xs }


///// Function html
// Returns the contents of the node as a serialised HTML representation.
//
// html :: [Element] -> String
function html(xs) {
  return _.map(xs, function(node){ return node.innerHTML })}


///// Function html_set
// Replaces the node's children structure by one constructed from the
// given serialised HTML.
//
// html_set! :: element:[Element]*, String -> element
function html_set(xs, value) {
  _.each(xs, function(node){ node.innerHTML = value })
  return xs }



//// - Exports ----------------------------------------------------------------
module.exports = { attributes    : attributes
                 , attribute     : attribute
                 , attribute_set : attribute_set
                 , text          : text
                 , text_set      : text_set
                 , html          : html
                 , html_set      : html_set

                 , internal      : { TEXT: TEXT }
                 }