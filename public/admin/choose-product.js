//
// API Item Picker
//
var ChooseProductCustomField = function () {
	/// <summary>The type definition of this Agility Custom Field Type.</summary>
	var self = this;

	/// <field name="Label" type="String">The display name of the Custom Field Type</field>
	self.Label = "Choose Shopify Product";

	/// <field name="ReferenceName" type="String">The internal reference name of the Custom Field Type. Must not contain any special characters.</field>
	self.ReferenceName = "ChooseShopifyProduct";

	/// <field name="Render" type="Function">This function runs every time the field is rendered</field>
	self.Render = function (options) {
		/// <summary>
		///  The Render handler for this field.  Create any elements and bindings that you might need, pull down resources.
		///  This method will be called everytime to the field value changes.
		/// </summary>
		/// <param name="options" type="ContentManager.Global.CustomInputFieldParams">The options used to render this field.</param>



		//get our base element
		var $pnl = $(".product-picker-field", options.$elem);

		if ($pnl.size() == 0) {

			var htmlContent = "<input class='product-picker-field' type='hidden' style='width:100%' data-bind='value:selectedValue,select2:select2'>";
			//pull down the html template and load it into the element
			options.$elem.append(htmlContent)

			$pnl = $(".product-picker-field", options.$elem);


			//bind our viewmodel to this
			var viewModel = function () {

				/// <summary>The KO ViewModel that will be binded to your HTML template.</summary>
				/// <param name="options" type="Object">
				///     <field name="$elem" type="jQueryElem">The .field-row jQuery Dom Element.</field>
				///     <field name="contentItem" type="ContentItem Object">The entire Content Item object including Values and their KO Observable properties of all other fields on the form.</field>
				///     <field name="fieldBinding" type="KO Observable">The value binding of thie Custom Field Type. Get and set this field's value by using this property.</field>
				///     <field name="fieldSetting" type="Object">Object representing the field's settings such as 'Hidden', 'Label', and 'Description'</field>
				///     <field name="readonly" type="boolean">Represents if this field should be readonly or not.</field>
				/// </param>
				var self = this;

				self.ajaxRequest = null;

				self.selectedValue = options.fieldBinding.extend({ throttle: 500 });

				self.formatResult = function (item) {
					return item.node.title;
				};

				self.formatSelection = function (item) {

					options.contentItem.Values.ProductName(item.node.title);
					return item.node.title;
				};
				self.ajaxRequest = null;

				self.select2 = {
					label: 'Product',
					readOnly: false,
					value: options.fieldBinding,
					multiple: false,
					maximumSelectionSize: 1,
					minimumInputLength: 0,
					placeholder: 'Find product...',
					formatResult: self.formatResult,
					formatSelection: self.formatSelection,

					matcher: function (term, text) {
						return true;
					},

					id: function (obj) {
						//set content of the Agility CMS Content Item

						//options.contentItem.Values.ExternalID(obj.ID)

						//options.contentItem.Values.MyField1(obj.Value1)
						//options.contentItem.Values.MyField2(obj.Value2)
						//etc...

						//return the ID
						return obj.node.id;
					},

					ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
						url: "https://sample-swag-shopify.vercel.app/api/search-products",
						dataType: 'json',
						type: "get",
						quietMillis: 250,

						originalValue: ko.unwrap(options.fieldBinding),
						term: "",
						data: function (term, page, params) {
							return {
								filter: term, // search term
							};
						},
						results: function (data, page) {

							return {
								results: data
							};
						},
						current: function (data) {

						},
						cache: true
					},
					initSelection: function (element, callback) {
						//use the hidden "product name" field
						var val = ko.unwrap(options.fieldBinding);
						var label = ko.unwrap(options.contentItem.Values.ProductName);

						if (val && label) {
							var data = {
								node: {
									id: val,
									title: label
								}
							};

							callback(data);
						}
					},
					allowClear: false,
					dropdownCssClass: "bigdrop"
				};
			}

			ko.applyBindings(viewModel, $pnl.get(0));
		}

	}
}

ContentManager.Global.CustomInputFormFields.push(new ChooseProductCustomField());