<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content.
 *
 * @package WordPress
 * @subpackage Theme
 * @since 1.0
 */
?>
<?php $t =& peTheme(); ?>
<?php $layout =& $t->layout; ?>

<?php do_action("pe_theme_before_footer"); ?>
	<div class="footer" id="footer">
		<section class="foot-lower">
			<div class="pe-container">
				<?php if ( $t->options->get("footerLogo") ) : ?>
					<div class="row-fluid">
						<div class="logo-foot">
							<a href="<?php echo home_url(); ?>" title="<?php _e("Home",'Pixelentity Theme/Plugin'); ?>" >
								<?php $t->image->retina($t->options->get("footerLogo")); ?>
							</a>
						</div>
					</div>
				<?php endif; ?>
				<div class="row-fluid ">
					<div class="span12 copyright">
						<?php echo $t->options->get("footerCopyright"); ?>
					</div>
				</div>
				<div class="row-fluid">
					<div class="social-media-wrap">
						<div class="social-media">
							<?php $t->content->socialLinks($t->options->get("footerSocialLinks"),"bottom"); ?>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>

<?php $t->footer->wp_footer(); ?>

<script>

jQuery(function($) {
     $('#menu-item-917 > a').on('click', function() {
          window.location = "http://mbfbapps.com/ctbc/visual-tour";
     });
});

jQuery("#lang_sel_list").wrap("<div id='lselector'></div>");
jQuery("#lang_sel_list").prepend("<div id='lselectoricon'></div><div id='lselectortitle'>Choose a language</div>");

//jQuery("#lselectoricon").click($("#lselectoricon").animate({top: "+=149px",}, duration ););

jQuery(function($) {
     $('#lselectoricon').on('click', function() {
          //$("#lang_sel_list").animate({right: "0px"}, "slow" );
		  
		  $("#lang_sel_list").toggleClass("rightzero");
     });
});

</script>

</body>
</html>