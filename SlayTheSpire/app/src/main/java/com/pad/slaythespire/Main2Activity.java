package com.pad.slaythespire;

import android.app.ActionBar;
import android.os.Build;
import android.support.design.widget.BottomNavigationView;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;

public class Main2Activity extends AppCompatActivity implements View.OnClickListener{


    private SectionsPagerAdapter mSectionsPagerAdapter;


    private ViewPager mViewPager;


    private BottomNavigationView navigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,

                WindowManager.LayoutParams.FLAG_FULLSCREEN);



        setContentView(R.layout.activity_main2);

        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);


        mViewPager.setCurrentItem(2);
        findViewById(R.id.icon_card).setOnClickListener(this);
        findViewById(R.id.icon_friend).setOnClickListener(this);
        findViewById(R.id.icon_battle).setOnClickListener(this);
        findViewById(R.id.icon_classification).setOnClickListener(this);
        findViewById(R.id.icon_info).setOnClickListener(this);
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.icon_card:
                mViewPager.setCurrentItem(0);
                break;
            case R.id.icon_friend:
                mViewPager.setCurrentItem(1);
                break;
            case R.id.icon_battle:
                mViewPager.setCurrentItem(2);
                break;
            case R.id.icon_classification:
                mViewPager.setCurrentItem(3);
                break;
            case R.id.icon_info:
                mViewPager.setCurrentItem(4);
                break;
        }
    }


    public static class PlaceholderFragment extends Fragment {




        private static final String ARG_SECTION_NUMBER = "section_number";

        public PlaceholderFragment() {
        }


        public static Fragment newInstance(int sectionNumber) {
            Fragment fragment = null;
            switch(sectionNumber){
                case 0:
                    fragment = new CardFragment();
                    break;
                case 1:
                    fragment = new FriendFragment();
                    break;
                case 2:
                    fragment = new HomeFragment();
                    break;
                case 3:
                    fragment = new ClassificationFragment();
                    break;
                case 4:
                    fragment = new OptionFragment();
                    break;
                    default:break;
            }
            return fragment;
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_main2, container, false);
            return rootView;
        }
    }


    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            return PlaceholderFragment.newInstance(position);
        }

        @Override
        public int getCount() {
            return 5;
        }
    }
}
